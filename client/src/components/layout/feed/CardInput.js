import React, { useEffect, useContext, useState, Component } from "react";
import useSWR from "swr";
import Fuse from "fuse.js";

import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";

import { FilterContext } from "../../../context/FilterContext"

import ImageUploader from "react-images-upload";

import { countryList } from "./countries"

import {
    Badge,
    Container,
    Col,
    Row,
    InputGroup,
    FormControl,
    Pagination,
    Form,
    Button,
    Spinner,
    Dropdown,
    Card,
    Nav,
    Modal,
    Image,
    CardDeck,
    Tooltip,
    OverlayTrigger,
    ListGroup
  } from "react-bootstrap";

  import Select, { components } from 'react-select';

  import styled from 'styled-components';

  import sdg1 from "../../../assests/SDG Icons 2019_WEB/E-WEB-Goal-01.png"
  import sdg2 from "../../../assests/SDG Icons 2019_WEB/E-WEB-Goal-02.png"
  import sdg3 from "../../../assests/SDG Icons 2019_WEB/E-WEB-Goal-03.png"
  import sdg4 from "../../../assests/SDG Icons 2019_WEB/E-WEB-Goal-04.png"
  import sdg5 from "../../../assests/SDG Icons 2019_WEB/E-WEB-Goal-05.png"
  import sdg6 from "../../../assests/SDG Icons 2019_WEB/E-WEB-Goal-06.png"
  import sdg7 from "../../../assests/SDG Icons 2019_WEB/E-WEB-Goal-07.png"
  import sdg8 from "../../../assests/SDG Icons 2019_WEB/E-WEB-Goal-08.png"
  import sdg9 from "../../../assests/SDG Icons 2019_WEB/E-WEB-Goal-09.png"
  import sdg10 from "../../../assests/SDG Icons 2019_WEB/E-WEB-Goal-10.png"
  import sdg11 from "../../../assests/SDG Icons 2019_WEB/E-WEB-Goal-11.png"
  import sdg12 from "../../../assests/SDG Icons 2019_WEB/E-WEB-Goal-12.png"
  import sdg13 from "../../../assests/SDG Icons 2019_WEB/E-WEB-Goal-13.png"
  import sdg14 from "../../../assests/SDG Icons 2019_WEB/E-WEB-Goal-14.png"
  import sdg15 from "../../../assests/SDG Icons 2019_WEB/E-WEB-Goal-15.png"
  import sdg16 from "../../../assests/SDG Icons 2019_WEB/E-WEB-Goal-16.png"
  import sdg17 from "../../../assests/SDG Icons 2019_WEB/E-WEB-Goal-17.png"

  import {GridList, GridListTile, makeStyles} from '@material-ui/core'

  console.log(sdg1)

//import Filter from "../layout/feed/Filter";

const esgs = [
    {"Environmental": {
      "Affordable and clean energy": [
        "Access to electricity",
        "Access to clean fuels for cooking",
        "Renewable energy",
        "Energy efficiency",
        "Access and investments in clean energy",
        "Domestic material consumption",
      ],
      "Industry innovation and infrastructure": [
        "Passenger and freight volumes",
        "Manufacturing value",
        "Manufacturing employment",
        "Value of small-scale industry",
        "Small-scale industries with affordable credit",
        "CO2 emissions per unit value added",
        "Research and Development (R&D) spending",
        "Researchers per million inhabitants",
        "Development assistance for infrastructure",
        "Medium and high-tech industry",
        
        ""
      ],
      "Responsible consumption and production": [
        "Sustainable consumption and production action plans",
        "Material footprint",
        "Domestic material consumption",
        "Global food loss",
        "International agreements on hazardous waste",
        "Hazardous waste generation",
        "Recycling rates",
        "Companies publishing sustainability reports",
        "National sustainable procurement plans",
        "Understanding of sustainable lifestyles",
        "Support for developing countries' capacity for sustainable production",
        "Monitoring sustainable tourism",
        "Removing fossil fuel subsidies",
        
      ],
      "Climate action": [
        "Deaths and injuries from natural disasters",
        "National disaster risk management",
        "Local disaster risk management",
        "Integration of climate change into national policies",
        "Education on climate change",
        "Capacity-building for climate change",
        "Green Climate Fund mobilization of $100 billion",
        "Support for planning and management in least-developed countries",
        
      ],
      "Life below water": [
        "Reduce marine pollution",
        "Protect and restore ecosystems",
        "Reduce ocean acidification",
        "Fish stocks within sustainable levels",
        "Protected marine areas",
        "Combat illegal, unreported and unregulated fishing",
        "Income from sustainable fisheries",
        "Research resources for marine technology",
        "Support small scale fishers",
        "Implementing international sea law"
      ],
      "Life on land": [
        "Forest Area",
        "Terrestrial Protected areas",
        "Land degradation",
        "Mountain Green Cover Index",
        "Red List Index",
        "Official development assistance for biodiversity",
        "Official development assistance for forest management",
  
      ],
    }},
    {"Social": {
      "No poverty": [
        "Eradicate extreme poverty",
        "Halve population below national poverty line",
        "Population in poverty according to national definitions",
        "Population covered by social protection floors/systems",
        "Access to basic services",
        "Deaths and affected persons from natural disasters",
        "Direct economic loss from natural disasters",
        "Disaster risk reduction strategies",
        "Local disaster risk reduction",
        "Government spending on essential services",
      ],
      "Zero hunger": [
        "Prevalence of Undernourishment (PoU)",
        "Food Insecurity Experience (FIES)",
        "Prevalence of childhood stunting",
        "Prevalence of childhood malnutrition (wasting or overweight)",
        "Production per labour unit",
        "Income of small-scale food producers",
        "Genetic resources in conservation facilities",
        "Agriculture orientation index", 
        "Official flows to agriculture",
        "Agricultural export subsidies",
        "Food price anomalies",
      ],
      "Good health and well-being": [
        "Maternal mortality ratio",
        "Skilled birth attendance",
        "Under-5 mortality rate",
        "Neonatal mortality rate",
        "Number of new HIV infections per 1,000 uninfected population, by sex, age and key populations",
        "Tuberculosis incidence per 100,000 population",
        "Malaria incidence per 1,000 population",
        "Hepatitis B incidence per 100,000 population",
        "Number of people requiring interventions against neglected tropical diseases",
        "Mortality rate attributed to cardiovascular disease, cancer, diabetes or chronic respiratory disease",
        "Suicide mortality rate",
        "Alcohol consumption per capita",
        "Halve the number of road traffic deaths",
        "Proportion of women of reproductive age (aged 15–49 years) who have their need for family planning satisfied with modern methods",
        "Adolescent birth rate",
        "Coverage of essential health services",
        "Household expenditures on health",
        "Mortality rate from air pollution",
        "Mortality rate from unsafe water, sanitation, hygiene (WASH)",
        "Mortality rate attributed to unintentional poisoning",
        "Prevalence of tobacco use",
        "Vaccine coverage",
        "Development assistance to medical research & basic healthcare",
      ],
      "Quality education": [
        "Achieving proficiency in reading and mathematics",
        "Participation in pre-primary education",
        "Equal access to further education",
        "Information and communications technology (ICT) skills",
        "Total net enrolment rate",
        "Literacy rate",
        "Inclusive and safe schools",
        "Scholarships for developing countries",
      ],
      "Gender equality": [
        "Legal frameworks for gender equality and non-discrimination",
        "Violence against women from an intimate partner",
        "Violence against women from persons other than an intimate partner",
        "Women married before age 15 or 18",
        "Female genital mutilation/cutting",
        "Time spent on unpaid domestic and care work",
        "Women in political positions",
        "Women in managerial positions",
        "Women decision-making on contraceptive use and healthcare",
        "Female land rights or ownership",
        "Equal rights to land ownership",
        "Systems to track gender equality",
      ],
      "Clean water and sanitation": [
        "Safe drinking water",
        "Safe sanitation and hygiene",
        "Ambient water quality",
        "Levels of freshwater stress",
        "Access to electricity",
        "Access to clean fuels for cooking",
        "Renewable energy",
        "Energy efficiency",
        "Access and investments in clean energy",
        "Integrated water management",
        "Transboundary water cooperation",
        "Protect and restore water-related ecosystems",
      ],
      "Decent work and economic growth": [
        "GDP per capita growth rate",
        "GDP per capita growth rate per employed person",
        "Informal employment",
        "Hourly earnings",
        "Youth employment, education and training",
        "Child labour",
        "Occupational injuries",
        "Access to financial services",
        "Population with financial account",
        "Aid for trade",
      ],
      "Reduced inequalities": [
        "Income growth inequalities",
        "People living below 50 per cent of median income",
        "Eliminating discriminatory practices",
        "Policies for greater equality",
        "Regulating financial markets",
        "Voting rights for developing countries",
        "Migration recruitment costs",
        "Well-planned migration policies",
        "Differential tariffs for least developed countries",
        "Development assistance and investment",
        "Remittance costs",
      ],
      "Sustainable cities and communities": [
        "Urban population living in slums",
        "Public transport access",
        "Sustainable urbanization rates",
        "Urban planning management",
        "Protecting cultural heritage",
        "Deaths and injuries from natural disasters",
        "Economic losses from natural disasters",
        "Solid waste management",
        "Urban air pollution",
        "Open spaces in cities",
        "Safe spaces in cities",
        "Urban and regional planning",
        "Integrated disaster risk management",
        "Local disaster risk management",
        "Sustainable and resilient buildings in least developed countries",
      ]
    }},
    {
      "Governance": {
      "Peace justice and strong institutions": [
        "Violence against children",
        "Victim reports of crime",
        "Unsentenced detainees",
        "Bribery prevalence",
        "Human trafficking",
  
      ],
      "Partnerships for the goals": [
        "Government revenue",
        "Domestic taxes",
        "Foreign direct investment",
        "Volume of remittances",
        "Debt service",
        "SDG support for developing countries",
        "Exports from developing countries",
        "Tariffs for developing countries",
        "Statistical Capacity",
  
      ]
    }}
  ];

const sdgs = [
  { name: "No poverty", pic: sdg1 },
  { name: "Zero hunger", pic: sdg2 },
  { name: "Good health and well-being", pic: sdg3 },
  { name: "Quality education", pic: sdg4 },
  { name: "Gender equality", pic: sdg5 },
  { name: "Clean water and sanitation", pic: sdg6 },
  { name: "Affordable and clean energy", pic: sdg7 },
  { name: "Decent work and economic growth", pic: sdg8 },
  { name: "Industry innovation and infrastructure", pic: sdg9 },
  { name: "Reduced inequalities", pic: sdg10 },
  { name: "Sustainable cities and communities", pic: sdg11 },
  { name: "Responsible consumption and production", pic: sdg12 },
  { name: "Climate action", pic: sdg13 },
  { name: "Life below water", pic: sdg14 },
  { name: "Life on land", pic: sdg15 },
  { name: "Peace justice and strong institutions", pic: sdg16 },
  { name: "Partnerships for the goals", pic: sdg17 }
];

const esgAlone = [
    "Environmental", "Social", "Governance"
]

const esgToIndex = {
    "Environmental": 0,
    "Social": 1,
    "Governance": 2,
}

const currencies = [
  "EUR",
  "USD",
];

const impactSignificance = [
  "Significant Impact",
  "Considerable Impact",
  "Limited Impact",
];

const impactSigValues = {
  "Significant Impact": 0.03,
  "Considerable Impact": 0.015,
  "Limited Impact": 0.0049999,
}

const links = ["Overall" ,"Impact", "Organisation"];

  /*  _id: 1,
        titel: "School in Yemen",
        orgName: "UNICEF",
        orgDescription: "UNICEF works in over 190 countries and territories to save children’s lives, to defend their rights, and to help them fulfil their potential, from early childhood through adolescence",
        donationDescribtion: "In cooperation with Unicef the Deutsche Börse Group was able to build a school for 300 children",
        amount: "8000 USD",
        impact: {
          achieved: "220 students entered the school in 2018-2020",
          hci2018: "0.35",
          hci2018: "0.37 (+0.02)",

        },
        linkToOrganisation: "https://www.unicef.org",
        esgGoals: ["Environmental"],
        sustainableGoals: [
          "Quality education",
          "Gender equality",]
*/

const CardInput = (props) => {
  const {
      cardFilter,
      toggleFilter,
      clearFilter
  } = useContext(FilterContext);
  const [inputCard, setInputCard] = useState({
      titel: "",
      orgName: "",
      orgDescription: "",
      donationDescribtion: "",
      amount: "",
      currency: "EUR",
      impact: {
        achieved: "",
        hci2018: "",
        hci2020: "",
      },
      linkToOrganisation: "",
      esgGoals: [],
      sustainableGoals: [
        ],
      dependentVariable: "",
      independentVariables: "",
      esg: "",
      sdg: "",
      metric: "",
      percentPerValue: "0.00000465",
      impactInPercent: "0",
      startProject: "",
      endProject: "",
      country: "",
      partnerSince: "",
      expectedImpact: "",
      trueImpact: "",
  })
  const [selectedTabDescription, setSelectedTabDescription] = useState("write");
  
  const updateInputCard = (value, attribute) => {
      console.log(value)
      let updated = {};
      updated[attribute] = value;
      setInputCard({ ...inputCard, ...updated });
      if (attribute === "sdg") {
        handleClose()
      }
      if (attribute === "esg") {
        updated["sdg"] = "";
        setInputCard({ ...inputCard, ...updated });
      }
      
  }
  const updateImpact = (
      value,
      propsAttribute,
      pointAttribute
      ) => {
          let values = {...inputCard.impact};
          values[pointAttribute] = value;
          let newState = {};
          newState[propsAttribute] = values;
          console.log(newState);
          setInputCard({ ...inputCard, ...newState });
          console.log(inputCard)
      }
  const correctFilter = cardFilter;
  
  const [pictures, setPictures] = useState([]);
  const onDrop = picture => {
  setPictures([...pictures, picture]);
  }

  const [impactPercentage, setImpactPercentage] = useState(0);
  

  useEffect(()=> {
    if (inputCard.metric && inputCard.independentVariables && inputCard.amount) {
      setImpactPercentage(parseInt(inputCard.amount) * parseFloat(inputCard.percentPerValue) * 100);
      //updateInputCard(impactPercentage ,"impactPercentage")
    }
  })
  const [currentTab, setCurrentTab] = useState("Impact");

  const changeTab = (item) => {
    setCurrentTab(item)
    console.log(currentTab)
}

const styles = {
  badge: {
    fontSize: 25,
    with: 70,
  }
}
const countries = [];
countryList.map((country) => {
  countries.push({ label: country, value: country})
});

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 200,
    height: 120,
  },
}));

const [sdgsPics, setSdgsPics] = useState([]);
const classes = useStyles();

useEffect(() => {
  console.log(inputCard.esg !== "")
  if (inputCard.esg !== "") {
    const sdgForPic = [];
    console.log(inputCard.esg)
    Object.keys(esgs[esgToIndex[inputCard.esg]][inputCard.esg]).map((sdg) => {
      console.log(sdg)
      const sPic = sdgs.find(sdgs => sdgs.name === sdg)
      console.log(sPic)
      sdgForPic.push(sPic)
    })
    console.log(sdgForPic)
    setSdgsPics(sdgForPic);
  }
  console.log(inputCard)
}, [inputCard.esg])

const findPic = () => {
  const picture = "";
  //const sdg = sdgsPics.find(sdg => sdg.)
}

const [showRep, setShowRep] = useState(false);
  const handleCloseRep = () => setShowRep(false);
  const handleShowRep = () => setShowRep(true);

  const [showFeed, setShowFeed] = useState(false);
  const handleCloseFeed = () => setShowFeed(false);
  const handleShowFeed = () => setShowFeed(true);

  const [showSub, setShowSub] = useState(false);
  const handleCloseSub = () => setShowSub(false);
  const handleShowSub = () => setShowSub(true);

  return (
      
      <Form>
        <CardDeck>  
              <Card style={{backgroundColor: "#EBF9FF"}}>
              <Card.Body>
              <h5 className="mb-5">Input for the "Impact Tab" of the Donation Card</h5>
              <div className="mb-5">To see the full usability of our Impact Calculater, please select an ESG-Factor and the following SDGs and ESG-subfactors, including the amount you want to donate</div>
              <Form.Group as={Row} controlId="esg" className="mt-5">
                      <Col lg = {4} >
                          <Form.Label>
                              The ESG-Factor you want to impact: 
                          </Form.Label>
                      </Col>
                      <Col lg = {8} md= {8}>
                      
                        <div key={`custom-inline-${esgAlone[0]}`} className="mb-3">
                        <Form.Check
                           checked={inputCard.esg === "Environmental"}
                           inline
                           label={<div style={{fontSize:"x-large"}}><strong style={{color:"#9AE5AF"}}>E</strong>nvironmental</div>}
                           type={"radio"}
                           id={`custom-inline-${esgAlone[0]}-1`}
                           onChange={(e) =>
                            updateInputCard("Environmental", "esg")}
                         />
                         <Form.Check
                           checked={inputCard.esg === "Social"}
                           inline
                           label={<div style={{fontSize:"x-large"}}><strong style={{color:"#FFE2A9"}} >S</strong>ocial</div>}
                           type={"radio"}
                           id={`custom-inline-${esgAlone[1]}-2`}
                           onChange={(e) =>
                            updateInputCard("Social", "esg")}
                         />
                         <Form.Check
                           checked={inputCard.esg === "Governance"}
                           inline
                           label={<div style={{fontSize:"x-large"}}><strong style={{color:"#D0BBEA"}}>G</strong>overnance</div>}
                           type={"radio"}
                           id={`custom-inline-${esgAlone[2]}-3`}
                           onChange={(e) =>
                            updateInputCard("Governance", "esg")}
                         />
                         </div>
                         
                      </Col>
                  </Form.Group>
                
                    
                  
                  {inputCard.esg ? (
                  
                  <Form.Group as={Row} controlId="sdg" className="mt-4">
                      <Col lg = {4} >
                          <Form.Label>
                              The SDG you want to impact: 
                          </Form.Label>
                      </Col>
                      <Col lg = {8} md= {8} className="text-center">
                        {inputCard.sdg ? (
                              <Image className="auto" style={{height: 155, width: 155, borderColor: "black"}} src={sdgsPics.find(sdg => inputCard.sdg === sdg.name).pic} onClick={handleShow} />
                          ) : (
                            <Button className="justify content-center" variant="Vis1" style={{height: 155, width: 155}} onClick={handleShow}>
                              e.g. Quality Education
                            </Button>
                          )}
                      
                        <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Header closeButton >
                            <Modal.Title>Choose your Sustainability Goal</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                          <GridList cellHeight={200}  cols={2}>
                          {
                            sdgsPics.map((sdg) => (
                              <GridListTile key={sdg.pic} className={classes.gridList} cols={sdg.pic || 1}>
                                <img src={sdg.pic} alt={sdg.name} onClick={(e) => updateInputCard(sdg.name, "sdg")}/>
                              </GridListTile>
                            ))}
                          </GridList>
                          </Modal.Body>
                          
                        </Modal>
                          
                      </Col>
                      
                  </Form.Group>
                  ) : ("")}
                  {inputCard.sdg && inputCard.esg ? (
                  <Form.Group as={Row} controlId="metric"  className="mt-4">
                      <Col lg = {4} >
                          <Form.Label>
                              The metric you want to impact: 
                          </Form.Label>
                      </Col>
                      <Col lg = {8} md= {8}>
                          <Dropdown>
                            <Dropdown.Toggle variant="Vis1">
                              {inputCard.metric
                                ? inputCard.metric
                                : "e.g. ICT skills"}
                            </Dropdown.Toggle>
                              
                            <Dropdown.Menu style={{ overflowY: "scroll" }}>
                              {
                              esgs[esgToIndex[inputCard.esg]][inputCard.esg][inputCard.sdg].map((metric) => (
                                <Dropdown.Item
                                  key={`custom-${metric}`}
                                  className="mb-3"
                                  eventKey={`${metric}`}
                                  onSelect={(e) =>
                                      updateInputCard(e, "metric")
                                  }
                                >
                                  {`${metric}`}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                      </Col>
                  </Form.Group>
                  ) : ("")}
                  {inputCard.metric ? (
                  <Form.Group as={Row} controlId="independentVariable"  className="mt-4">
                      <Col lg = {4} >
                          <Form.Label>
                              The metric you want to donate in: 
                          </Form.Label>
                      </Col>
                      <Col lg = {8} md= {8}>
                          <Dropdown>
                            <Dropdown.Toggle variant="Vis1">
                              {inputCard.independentVariables
                                ? inputCard.independentVariables
                                : "e.g. Participation in pre-primary education"}
                            </Dropdown.Toggle>
                              
                            <Dropdown.Menu style={{ overflowY: "scroll" }}>
                              {
                              esgs[esgToIndex[inputCard.esg]][inputCard.esg][inputCard.sdg].filter(metric => metric !== inputCard.metric).map((independentVariable) => (
                                <Dropdown.Item
                                  key={`custom-${independentVariable}`}
                                  className="mb-3"
                                  eventKey={`${independentVariable}`}
                                  onSelect={(e) =>
                                      updateInputCard(e, "independentVariables")
                                  }
                                >
                                  {`${independentVariable}`}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                      </Col>
                  </Form.Group>
                  ) : ("")}
                  
                  <Form.Group as={Row} controlId="amount">
                    <Col lg = {4} >
                      <Form.Label>Donation Amount</Form.Label>
                    </Col>
                    <Col lg="6">
                      <Form.Control
                        type="number"
                        defaultValue={inputCard.amount}
                        placeholder="e.g. 8000"
                        value={inputCard.amount}
                            onChange={(e) =>
                              updateInputCard(
                                e.target.value,
                                "amount",
                                
                              )}
                      />
                    </Col>
                    <Col lg="2">
                    
                      <Dropdown>
                        <Dropdown.Toggle variant="Vis1">
                          {inputCard.currency
                            ? inputCard.currency
                            : currencies[0]}
                        </Dropdown.Toggle>
                          
                        <Dropdown.Menu style={{ overflowY: "scroll" }}>
                          {
                          currencies.map((currency) => (
                            <Dropdown.Item
                              key={`custom-${currency}`}
                              className="mb-3"
                              eventKey={`${currency}`}
                              onSelect={(e) =>
                                  updateInputCard(e, "currency")
                              }
                            >
                              {`${currency}`}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>                     
                    </Col>                    
                  </Form.Group>
                  <hr></hr>
                  <Form.Group as={Row} controlId="overallImpact" className="mb-5 mt-5">
                    <Col lg = {4} >
                      <Form.Label>
                        Your generated Impact:
                      </Form.Label>
                      <OverlayTrigger
                                  
                                  placement="right"
                                  overlay={<Tooltip id={`tooltip-1`}>
                                  Want to know how we calculate your impact?
                                </Tooltip>}
                                >
                                    <Button
                                      
                                      variant="Vis1"
                                      className="mt-2"
                                      onClick={handleShowRep}
                                      
                                    >
                                      How?
                                    </Button>
                                    
                                  
                                </OverlayTrigger>
                                <Modal
                                      show={showRep}
                                      onHide={handleCloseRep}
                                      backdrop="dynamic"
                                      keyboard={false}
                                      
                                      centered
                                      >
                                        <Modal.Header closeButton>
                                          <Modal.Title className="text-center"> Significance calculator </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                          <Row className="justify-content-md-center mt-2 mb-4 mx-2">
                                            <div  style={{color: "grey", fontSize: "large"}}>
                                            Based on the above example, an expert (user) of our tool will have to enter data into the respective field, and if the correlation is noticeable, then when calculating the regression equation, the system will give three categories - Significant, Considerable and Limited effects depending on on the coefficients of the equation (with the quality of the model more than 60%)
                                            </div>
                                          </Row>
                                          
                                          
                                        </Modal.Body>
                                      </Modal>
                    </Col>
                    <Col lg = {8} md= {8}>
                      <>
                      {inputCard.metric  && inputCard.amount && inputCard.independentVariables  ? (
                        <div >
                        
                                            
                          {impactPercentage >= impactSigValues["Significant Impact"] ? (
                            <Badge
                            variant="success"
                            style={styles.badge}>
                              {`Significant Impact: ${Math.round(impactPercentage * 100) / 100} %`}
  
                          </Badge>
                          ) : impactPercentage >= impactSigValues["Considerable Impact"] ? (
                            <Badge
                              variant="warning"
                              style={styles.badge}>
                                {`Considerable Impact: ${Math.round(impactPercentage * 100) / 100} %`}
                            </Badge>
                          ) : (
                            <Badge
                              variant="danger"
                              style={styles.badge}>
                                {`Limited Impact: ${Math.round(impactPercentage * 100) / 100} %`}
                            </Badge>
                          )
                          }
                          
                      
                      </div>
                      ) : (
                        <div>
                          <Form.Text>
                            Please fill in the needed values above 
                          </Form.Text>
                         
                        
                        </div>
                      )}
                      </>
                    </Col>
                  </Form.Group>
                  <hr></hr>
                  <Form.Group className="mt-5" as={Row} controlId="impactText">
                      <Col lg = {4} >
                          <Form.Label>
                              Your Impact Description: 
                          </Form.Label>
                      </Col>
                      <Col lg = {8} md= {8}>
                          <Form.Control
                            type="text"
                            placeholder="e.g. 220 students entered the school"
                            value={inputCard.impact.achieved}
                            onChange={(e) =>
                              updateImpact(
                                e.target.value,
                                "impact",
                                "achieved"
                              )
                            }
                          />
                      </Col>
                  </Form.Group>
                  <Row className="mx-3">
                  <div className="mt-5 text-center" style={{size: "lg", color: "#009"}}>Based on the impact you generate and the organisation rating created by the 
                    <Card.Link 
                       style={{color: "black"}}
                       href={"https://www.charitynavigator.org/"}
                      target="_blank"
                      rel="noopener noreferrer"> <strong><u> charity navigator</u></strong></Card.Link>, we calculate your impact score as following:</div>
                  </Row>
                  <Row className="mt-3 mx-3 mb-2 justify-content-center">
                    <div className="text-center" style={{color: "#009"}}>
                      additional fields which help you track the impact score and guide you through its outcome are <strong>coming soon!</strong> Additionally you can use the <strong>how</strong> buttons to get a feeling for it.
                    </div>
                  </Row>
                  <Row className="mx-3 mt-4 justify-content-md-center">
                    {inputCard.metric  && inputCard.amount && inputCard.independentVariables && inputCard.orgName ? (
                      <h2 style={{color: "#009" }}> 3.8 points</h2>
                    ) : (
                      <h2 style={{color: "#009", backgroundColor: "#D0BBEA"}}> 0 points </h2>
                    )
                  }
                  </Row>
                  <Row className="mt-5 justify-content-md-center">
                  <OverlayTrigger
                                  
                                  placement="right"
                                  overlay={<Tooltip id={`tooltip-1`}>
                                  Want to know how we calculate your Impact Score?
                                </Tooltip>}
                                >
                                    <Button
                                      
                                      variant="Vis1"
                                      className="mt-2"
                                      onClick={handleShowFeed}
                                      
                                    >
                                      How?
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
                                          <Modal.Title className="text-center"> Impact Score Calculator </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                          <Row className=" mt-2 mb-4 mx-2">
                                            <div  style={{color: "grey", fontSize: "large"}}>
                                              
                                                The calculator will quantify the impact and make it comparable between different donations  by producing an impact score as an outcome <br></br> <br></br>

                                                How does it work? <br></br>
                                                a) The calculator is composed of the metrics used  to measure the SDG and certain outcomes. Current outcome shows the outcome before the donation, target outcome shows the desired outcome while the actual outcome shows the result after the donation. These cells need to be filled in manually by the user of the tool. <br></br> 
                                                b) The user has two choices.: the weights can be assigned automatically from the regression activity developed in the tool or they can assign it manually. The same goes for the Score<br></br>
                                                c) In the end they get a score calculated by the weighted average of the weights and the score assigned to each of the metrics<br></br><br></br>

                                                Benefits: <br></br>
                                                1) Compare organizations outcomes for the same input ( e.g one can get an Impact score of 3.6 and another 2.4) This way it can clearly be seen where the donation has been more effective and wehre they should continue to invest<br></br>




 
                                            </div>
                                          </Row>
                                        </Modal.Body>
                                      </Modal>
                  </Row>
                  </Card.Body>
                  </Card>
                  <Card style={{backgroundColor: "#EBF9FF"}}>
                <Card.Body>
                <h5 className="mb-5">Input for general informations of the Donation Card</h5>
                  <Form.Group as={Row} controlId="Header">
                    <Col lg = {4} >
                        <Form.Label>
                            Your Project Name: 
                        </Form.Label>
                    </Col>
                    <Col lg = {8} md= {8}>
                        <Form.Control
                          type="text"
                          placeholder="e.g. School in Yemen"
                          value={inputCard.title}
                          onChange={(e) => updateInputCard(e.target.value, "titel")}
                        />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="country">
                    <Col lg = {4} >
                        <Form.Label>
                            Choose Country: 
                        </Form.Label>
                    </Col>
                    <Col lg = {8} md= {8}>
                      
                      <Select
                        //defaultValue={colourOptions[0]}
                        isClearable
                        //components={{ Control: ControlComponent }}
                        isSearchable
                        name="countries"
                        options={countries}
                        onChange={(e) => e === null ? updateInputCard("", "country") : updateInputCard(e[0], "country")}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="dateOfPublication">
                    <Form.Label column lg = {4} >
                      Your project period
                    </Form.Label>
                    <Col lg = {3} md= {3}>
                      <Form.Control
                        type="date"
                        placeholder="Enter the start date..."
                        value={inputCard.startProject}
                        onChange={(e) =>
                          updateInputCard(e.target.value, "startProject")
                        }
                      />
                    </Col>
                    <Col lg = {1} md= {1}>
                        to
                    </Col>
                    <Col lg = {3} md= {3}>
                      <Form.Control
                        type="date"
                        placeholder="Enter the end date..."
                        value={inputCard.endProject}
                        onChange={(e) =>
                          updateInputCard(e.target.value, "endProject")
                        }
                      />
                    </Col>
                  </Form.Group>
                  <h5 className="mb-5 mt-5">Input for the "Organisation Tab" of the Donation Card</h5>
                  <Form.Group as={Row} controlId="orgName">
                      <Col lg = {4} >
                          <Form.Label>
                              Name of Organisation:
                          </Form.Label>
                      </Col>
                      <Col lg = {8} md= {8}>
                          <Form.Control
                            type="text"
                            placeholder="e.g. Unicef"
                            value={inputCard.orgName}
                            onChange={(e) =>
                              updateInputCard(
                                e.target.value,
                                "orgName"
                              )
                            }
                          />
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="orgDescription">
                      <Col lg = {4} >
                          <Form.Label>
                              Desription of the Organisation: 
                          </Form.Label>
                      </Col>
                      <Col lg = {8} md= {8}>
                          
                          <Form.Control
                            type="text"
                            placeholder="e.g. Improve Access to Education"
                            value={inputCard.orgDescription}
                            onChange={(e) =>
                              updateInputCard(
                                e.target.value,
                                "orgDescription"
                              )
                            }
                          />
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="linkToWebsite">
                      <Col lg = {4} >
                          <Form.Label>
                              Link to Website:
                          </Form.Label>
                      </Col>
                      <Col lg = {8} md= {8}>
                          <Form.Control
                            type="link"
                            placeholder="e.g. www.unicef.org"
                            value={inputCard.linkToWebsite}
                            onChange={(e) =>
                              updateInputCard(
                                e.target.value,
                                "linkToWebsite"
                              )
                            }
                          />
                      </Col>
                     
                      </Form.Group>
                      <Form.Group as={Row} controlId="dateOfPublication">
                        <Form.Label column lg = {4} >
                          Partner since:
                        </Form.Label>
                        <Col lg = {8} md= {8}>
                          <Form.Control
                            type="date"
                            placeholder="e.g. 2020"
                            value={inputCard.partnerSince}
                            onChange={(e) =>
                              updateInputCard(e.target.value, "partnerSince")
                            }
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="image" className="mb-3">
                        <Col lg = {4} >
                          <Form.Label>Upload your Donation Card Picture:</Form.Label>
                        </Col>
                        <Col>
                          <ImageUploader
                            {...props}
                            withIcon={true}
                            onChange={onDrop}
                            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                            maxFileSize={5242880}
                          />
                      
                      </Col>
                      </Form.Group>
                      <Row className="justify-content-center ml-5 mt-5">
                      <OverlayTrigger
                                  
                                  placement="right"
                                  overlay={<Tooltip className="text-start" id={`tooltip-1`}>
                                  Please fill out the required fields:<br></br>
                                  1) ESG-factor <br></br> 2) SDG-factor <br></br> 3) Impact-ESG-subfactor <br></br> 4) Donation-ESG-subfactor <br></br> 5) Donation amount <br></br> 6) Organisation name
                                </Tooltip>}
                                >
              
              <Button
                variant="Vis5"
                style={{width:"200px"}}
                onClick={inputCard.amount && inputCard.esg && inputCard.sdg && inputCard.metric && inputCard.independentVariables && inputCard.orgName ? handleShowSub : ""}>
                Submit
              </Button>
              </OverlayTrigger>
              <Modal
                          show={showSub}
                          onHide={handleCloseSub}
                          backdrop="static"
                          keyboard={false}
                          size="lg"
                          
                        >
                          <Modal.Header closeButton style={{backgroundColor: "#EBF9FF"}}>
                            <Modal.Title style={{color: "#009"}}>Summary</Modal.Title>
                          </Modal.Header>
                          <Modal.Body style={{backgroundColor: "#e4d6ff"}}>
                            <Row className="justify-content-center mt-3">
                              <h2 className="mb-3" style={{color: "#009"}}>Congratulations!!!</h2>
                            </Row>
                            <Row className="justify-content-center mt-3">
                              <h4 style={{color: "#009"}}>You make <strong>significant</strong> impact with you donation</h4>
                            </Row>
                            <Row className="justify-content-center mt-3">
                              <h5 style={{color: "#009"}}>The Sustainability Goal you donate to:</h5>
                            </Row>
                            <Row>
                            
                            {inputCard.sdg ? (
                              <Image className="auto mt-4" style={{height: 155, width: 155, borderColor: "black"}} src={sdgsPics.find(sdg => inputCard.sdg === sdg.name).pic}/>
                            ) : ("")
                            }
                            </Row>
                            <Row className="justify-content-center mt-5">
                            <ListGroup className="text-left" variant="flush">
                              <ListGroup.Item className="text-left" style={{color: "#009" , backgroundColor: "lightgrey"}}>{`ESG - ${inputCard.esg}`}</ListGroup.Item>
                              <ListGroup.Item style={{color: "#009", backgroundColor: "lightgrey"}}>{`Organisation - ${inputCard.orgName}`}</ListGroup.Item>
                              <ListGroup.Item  className="text-left" style={{color: "#009", backgroundColor: "lightgrey"}}>{`Donating into - ${inputCard.independentVariables}`}</ListGroup.Item>
                              <ListGroup.Item className="text-left" style={{color: "#009", backgroundColor: "lightgrey"}}>{`Impact on - ${inputCard.metric}`}</ListGroup.Item>
                              <ListGroup.Item style={{color: "#009", backgroundColor: "lightgrey"}}>{`${inputCard.amount} ${inputCard.currency}`}</ListGroup.Item>
                            </ListGroup>
                            </Row>
                            <Row className="justify-content-center mt-5">
                              <h5 style={{color: "#009"}}>With your donation you generated an impact of <strong>5 %</strong> and which results in an Impact Score of <strong>3.6</strong> points</h5>
                            </Row>
                            <Row className="justify-content-center mt-3">
                              <h5 style={{color: "#009"}}>Keep up the great work!!</h5>
                            </Row>
                            <Row className="ml-2 mt-3">
                              <small style={{color: "black"}}>*values might differ from input</small>
                            </Row>
                            
                            
                          </Modal.Body>
                          <Modal.Footer style={{backgroundColor: "#EBF9FF"}}>
                          <OverlayTrigger
                                  
                                  placement="right"
                                  overlay={<Tooltip id={`tooltip-1`}>
                                  We didn't connect the Impact Calculator to the Database yet, so you won't find your projekt there :(
                                </Tooltip>}
                                >
                                    <Button
                                      
                                      variant="Vis1"
                                      className="mt-2"
                                      onClick={handleCloseSub}
                                      
                                    >
                                      Done
                                    </Button>
                                    
                                  
                                </OverlayTrigger>
                          </Modal.Footer>
                          
                        </Modal>
            </Row>
                </Card.Body>
              </Card>
            
        </CardDeck>
        
      </Form>
  );
};
export default CardInput;