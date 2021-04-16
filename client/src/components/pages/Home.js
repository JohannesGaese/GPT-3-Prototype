import React, { useEffect, useContext, useState } from "react";
import useSWR from "swr";
import Fuse from "fuse.js";

import { FilterContext, FilterProvider } from "../../context/FilterContext";

import Filter from "../layout/feed/Filter";
import DonationCard from "../layout/feed/DonationCard";

import axios from "axios";

import money from "./../../assests/icons/money.png"

import {
    Container,
    Col,
    Row,
    InputGroup,
    FormControl,
    Pagination,
    Form,
    Button,
    Spinner,
    Card,
    Modal,
    Tooltip,
    OverlayTrigger,
    Image
  } from "react-bootstrap";

  const fuseOptions = {
    shouldSort: true,
    threshold: 0.3,
    keys: ["titel", "orgName", "lawTypeOrg"],
    maxPatternLength: 30,
    location: 0,
    distance: 200,
  };

const x = axios.get("/api/donations/allCards")
    .then(res => console.log(res.data))
console.log(x)

axios.get('https://unstats.un.org/SDGAPI/v1/sdg/Indicator/List')
  .then(res => console.log(res.data))

  const dummySet = [
    {
        _id: 1,
        titel: "School in Yemen",
        orgName: "UNICEF",
        orgDescription: "Improve Access to Education",
        donationDescribtion: "In cooperation with Unicef the Deutsche Börse Group was able to build a school for 300 children",
        amount: "8000 USD",
        paymentFrequency: "Yearly",
        partnerShip: "Partner since 2020",
        projectStart: "29.11.2020",
        impact: {
          achieved: "300 students entered the school",
          hciDynamic: "0.32",
          impactScore: "3.8",
          

        },
        country: "Yemen",
        linkToOrganisation: "https://www.unicef.org",
        esgGoal: "Social",
        sustainableGoal: "Quality education",
        
    },
    {
      _id: 2,
      titel: "Access in Modern Energy Cooking",
      orgName: "World Bank",
      orgDescription: "Progress towards ensuring access to modern cooking solutions",
      donationDescribtion: "In cooperation with Unicef the Deutsche Börse Group was able to increase access to modern energy cooking by 2,5% in Sub-Saharan Africa",
      amount: "20000 USD",
      paymentFrequency: "Monthly",
      partnerShip: "Partner since 2020",
      projectStart: "01.10.2020",
      impact: {
        achieved: "150 stoves embedded",
        impactScore: "3.6",
      },
      country: "Ghana",
      linkToOrganisation: " https://www.worldbank.org/en/topic/energy/publication/the-state-of-access-to-modern-energy-cooking-services",
      esgGoal: "Environmental",
      sustainableGoal: "Affordable and Clean Energy",

    },

    {
      _id: 3,
      titel: "Peace, Justice and Strong Institutions",
      orgName: "The Open Working Group",
      orgDescription: "Progress towards ensuring access to modern cooking solutions",
      donationDescribtion: "In cooperation with the OWG the Deutsche Börse Group was able to help establish the system in which the SDGs can provide incentives for positive change, built around carrots and sticks and based on subsidiarity",
      amount: "38000 USD",
      paymentFrequency: "Yearly",
      partnerShip: "Partner since 2020",
      projectStart: "01.12.2020",
      impact: {
        achieved: "sub-goals classification system created",
        impactScore: "2.8",
      },
      country: "Jordan",
      linkToOrganisation: " https://sustainabledevelopment.un.org/sdgsproposal.html",
      esgGoal: "Governance",
      sustainableGoal: " Peace, Justice and Strong Institutions ",
      
  },

  
];


const Home = () => {

  const { data: donations } = useSWR("/api/donations/allCards", {
    revalidateOnFocus: false,
  });
  
  useEffect(() => {
    console.log(donations)
  },[donations])
  console.log(donations)

    const {
      getFilteredDonationCards,
      cardFilter
    } = useContext(FilterContext)

    const [displayDonations, setDisplayDonations] = useState([]);
    const [filteredDonations, setFilteredDonations] = useState([]);
    const [search, setSearch] = useState("");
    const [pageSize, setPageSize] = useState(8);

    const [page, setPage] = useState(0);
    //const { data: laws } = useSWR("/api/laws/allMerged", {
    //  revalidateOnFocus: false,
    //});

    //useEffect(() => {
    //    if (dummySet) {
    //      setFilteredDonations(
    //        getFilteredAndSortedLaws(newsfeedFilter, sorterNewsfeed, laws)
    //      );
    //    }
    //}, [laws, sorterNewsfeed, newsfeedFilter]);
    // Set correct laws to display when either laws, fitler or search changes
    useEffect(() => {
        if (search !== "") {
          const fuse = new Fuse(filteredDonations, fuseOptions);
          setDisplayDonations(fuse.search(search));
          setPage(0);
        } else {
          setDisplayDonations(filteredDonations);
          setPage(0);
        }
    }, [filteredDonations, search, /*sorterNewsfeed*/]);
    const firstPage = () => {
        setPage(0);
    };
    const prevPage = () => {
        if (0 < page) {
          setPage(page - 1);
        }
    };
    const nextPage = () => {
        if (displayDonations.length - pageSize > page * pageSize) {
          setPage(page + 1);
        }
    };
    const lastPage = () => {
         setPage(Math.ceil(displayDonations.length / pageSize) - 1);
    };
    const changePageSize = (e) => {
        e.preventDefault();
        setPage(0);
        setPageSize(parseInt(e.target.pageSize.value));
    };

    const [data, SetData] = useState(dummySet);

    const settingFilter = () => {
      return
    };

    const [showFeed, setShowFeed] = useState(false);
    const handleCloseFeed = () => setShowFeed(false);
    const handleShowFeed = () => setShowFeed(true);


    return (
        <>
            <Container  fluid className="text-center pt-3" /*style={{backgroundColor: "#e4d6ff"}}*/>
              <h3 className="mb-5 mt-3">See past projects of other users <OverlayTrigger
                                  placement="right"
                                  overlay={<Tooltip id={`tooltip-2`}>
                                  Need help with the <strong>Donation Database</strong>
                                </Tooltip>}
                                >
                                    <Button
                                      variant="Vis1"
                                      
                                      onClick={handleShowFeed}
                                    >
                                      Donation Database
                                    </Button>
                                  
                                </OverlayTrigger>
                                <Modal
                                      show={showFeed}
                                      onHide={handleCloseFeed}
                                      backdrop="dynamic"
                                      keyboard={false}
                                      
                                      centered
                                      >
                                        <Modal.Header closeButton>
                                          <Modal.Title className="text-center"> Donation Database </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                          <Row className="justify-content-md-center mt-2 mb-4 mx-2">
                                            <div  style={{color: "grey", fontSize: "large"}}>
                                              You want to know what the impact was of other Projects? 
                                            </div>
                                          </Row>
                                          <Image src={money} />
                                          <Row className="justify-content-md-center mt-5 mx-2">
                                            <div style={{color: "grey", fontSize: "large"}}>
                                              Use the Donation Database to get a feeling for impact various donations can achieve.
                                            </div>
                                          </Row>
                                          <Row className="justify-content-md-center mt-3 mx-2">
                                            <div style={{color: "grey", fontSize: "large"}}>
                                              Find out which SDGs are project worthy and concentrate your donation decisions on the important projects.
                                            </div>
                                          </Row>
                                          <Row className="justify-content-md-center mb-2 mt-3 mx-2">
                                            <div style={{color: "grey", fontSize: "large"}}>
                                              Update the Donation Database page with your projects and help others with their project decisions.
                                            </div>
                                          </Row>
                                        </Modal.Body>
                                      </Modal> </h3>
              
              <Row className="mt-5 justify-content-md-center mb-5">
                
                <Col>
                <Button
                    variant="Vis1"
                    style={{width: "200px", height: "55px"}}
                    size="lg"
                    onClick={(e) => {
                      data.length === 3 ?
                      SetData([data[0]])
                      : data[0].esgGoal === "Social"
                      ? SetData(dummySet)
                      : SetData([dummySet[0]])}}
                    >Social</Button>
                </Col>
                <Col className="align-items-center" >
                  <Button
                    variant="Vis1"
                    style={{width: "200px", height: "55px"}}
                    size="lg"
                    onClick={(e) => {
                      data.length === 3  ?
                      SetData([data[1]])
                      : data[0].esgGoal === "Environmental"
                      ? SetData(dummySet)
                      : SetData([dummySet[1]])}}
                    >Environmental</Button>
                  
                </Col>
                <Col>
                <Button
                    variant="Vis1"
                    style={{width: "200px", height: "55px"}}
                    size="lg"
                    onClick={(e) => {
                      data.length === 3 ?
                      SetData([data[2]])
                      : data[0].esgGoal === "Governance"
                      ? SetData(dummySet)
                      : SetData([dummySet[2]])}}
                    >Governance</Button>
                </Col>
                
              </Row>
              <hr></hr>
              <Row className="mt-5 justify-content-md-center" >
                
              
                {data  ? (
                  <>
                    <Col lg = {8} md={8} className="justify-content-md-center">
                    {data
                      .slice(page * pageSize, 3)
                      .map((donation) => (
                        <Col /*style={{backgroundColor : "grey"}}*/ className="pt-3 px-3 pb-3">
                          
                        <DonationCard
                          
                          className="shadow-sm "
                          key={donation._id}
                          donation={donation}
                        />
                        </Col>
                      ))}
                    </Col>
                    
                  
                    
                  </>
                ) : (
                  <div className="text-AO1 text-center spinner">
                    <Spinner animation="grow"></Spinner>
                    <h4>Cards are being loaded</h4>
                  </div>
                )}
              </Row>
            </Container>
        </>
    );
};

export default Home;