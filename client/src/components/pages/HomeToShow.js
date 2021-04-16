import React, { useEffect, useContext, useState } from "react";
import useSWR from "swr";
import Fuse from "fuse.js";

import { FilterContext, FilterProvider } from "../../context/FilterContext";

import Filter from "../layout/feed/Filter";
import DonationCard from "../layout/feed/DonationCard";

import axios from "axios";

import DonationPic from "./../../assests/DonationPic.png";
import logo from "./../../assests/logo.jpeg";
import DB_logo from "./../../assests/DB-logo.jpg";
import iconWorld from "./../../assests/icons/iconWorld.png";
import money from "./../../assests/icons/money.png";
import vision from "./../../assests/icons/vision.png";







import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingUsd,
  faBalanceScale,
  faBookOpen,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

import { useHistory } from "react-router-dom";

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
    Image,
    OverlayTrigger,
    Tooltip,
    Modal,
  } from "react-bootstrap";

const HomeToShow = () => {

  const [showRep, setShowRep] = useState(false);
  const handleCloseRep = () => setShowRep(false);
  const handleShowRep = () => setShowRep(true);

  const [showFeed, setShowFeed] = useState(false);
  const handleCloseFeed = () => setShowFeed(false);
  const handleShowFeed = () => setShowFeed(true);

  const [showCalc, setShowCalc] = useState(false);
  const handleCloseCalc = () => setShowCalc(false);
  const handleShowCalc = () => setShowCalc(true);


  let history = useHistory();

    const styles = {
        cardImage: {
          objectFit: 'cover',
          //borderRadius: 55,
          with: "100%",
          height: "100%"
        }
      }

      const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Simple tooltip
        </Tooltip>
      );

    return(
        <Container fluid>
        <Row>
        <Col className="justify-content-md-center mb-5">
            <Row style={{backgroundColor: "#e4d6ff" }} className="justify-content-md-center">
                <Col lg = {3} md= {3} className="mr-5 mt-5 texter-center">
                    <h3 className="mb-4 text-center">Make Your Impact Transparent</h3>
                    <div style={{ fontSize: "large" }} className="mb-5 text-center">
                    With us you can calculate <strong> your impact measurement </strong> in the most <strong> efficient </strong> way! 
                    The effective use of correlational data between ESG investments and
                    their long-term impact on society is at the core of our product market positions
                    </div>
                <div className="text-center">
                <Button style={{backgroundColor: "#009"}} className="mb-5 text-center" onClick={() => history.push("/impactcalculator")}>
                    Start free trial
                </Button> 
                </div>
                </Col>
            
            </Row>
            <Row  className="justify-content-md-center">
                
                
                    <Card 
                        className="mt-2 justify-content-md-center"
                        bg="white"
                        text="dark"
                        style={{  borderColor: "#ffffff" }}>

                        
                        <Card.Body style={{textAlign:"center"}} className="mb-3">
                        <h3 className="mb-4">Need some help?</h3>
                        <hr></hr>
                            <Card.Subtitle className="mt-4 mb-5" style={{fontSize: "large"}}>Let us navigate you</Card.Subtitle>
                            <Row className="mt-4">
                            <Col>
                                <Image 
                                  className="mb-5"
                                  style={{height:"70px"}}
                                  src={iconWorld}
                                />
                                <div className="mt-3 "><strong>Calculate</strong> your impact and create Donation Cards of projects</div>
                                <OverlayTrigger
                                  placement="right"
                                  overlay={<Tooltip id={`tooltip-1`}>
                                  Need help with the <strong>Impact Calculator?</strong>
                                </Tooltip>}
                                >
                                    <Button
                                      variant="Vis1"
                                      className="mt-4"
                                      onClick={handleShowCalc}
                                    >
                                      Impact Calculator
                                    </Button>
                                    
                                  
                                </OverlayTrigger>
                                <Modal
                                      show={showCalc}
                                      onHide={handleCloseCalc}
                                      backdrop="dynamic"
                                      keyboard={false}
                                      
                                      centered
                                      >
                                        <Modal.Header closeButton>
                                          <Modal.Title className="text-center"> Impact Calculator </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                          <Row className="justify-content-md-center mt-2 mb-4 mx-2">
                                            <div  style={{color: "grey", fontSize: "large"}}>
                                              You are not sure what impact significance your donation has? 
                                            </div>
                                          </Row>
                                          <Image src={iconWorld} />
                                          <Row className="justify-content-md-center mt-5 mx-2">
                                            <div style={{color: "grey", fontSize: "large"}}>
                                              Use the Impact Calculator to get a feeling for the impact a donation has on a given ESG-subfactor in regards of Impact Score and significance
                                            </div>
                                          </Row>
                                          <Row className="justify-content-md-center mt-3 mx-2">
                                            <div style={{color: "grey", fontSize: "large"}}>
                                              Find out which SDGs are important and concentrate your donation decisions on the important factors.
                                            </div>
                                          </Row>
                                          <Row className="justify-content-md-center mb-2 mt-3 mx-2">
                                            <div style={{color: "grey", fontSize: "large"}}>
                                            Choose ESG-Factor --{">"} SDG --{">"} ESG-subfactor --{">"} donation amount. With the organisation you use and the impact you create we calculate your Impact Score.
                                            </div>
                                          </Row>
                                        </Modal.Body>
                                      </Modal>
                            </Col>
                            <Col>
                            <Image 
                                  className="mb-5"
                                  style={{height:"70px"}}
                                  src={money}
                                />
                                <div className="mt-3 ">Generate the best possible <strong>impact</strong> with your donation</div>
                                <OverlayTrigger
                                  placement="right"
                                  overlay={<Tooltip id={`tooltip-2`}>
                                  Need help with the <strong>Donation Database</strong>
                                </Tooltip>}
                                >
                                    <Button
                                      variant="Vis1"
                                      className="mt-4"
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
                                              Update the Donation Database with your projects and help others in their project decisions.
                                            </div>
                                          </Row>
                                        </Modal.Body>
                                      </Modal>
                            </Col>
                            <Col>
                            <Image 
                                  className="mb-5"
                                  style={{height:"70px"}}
                                  src={vision}
                                />
                                <div className="mt-3">Update your Reporting and make your impact <strong>transparent</strong></div>
                                <OverlayTrigger
                                  placement="right"
                                  overlay={<Tooltip id={`tooltip-6`}>
                                    need help with the <strong>Reporting?</strong>
                                </Tooltip>}
                                >
                                    <Button
                                      variant="Vis1"
                                      className="mt-4"
                                      onClick={handleShowRep}
                                    >
                                      Reporting
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
                                          <Modal.Title className="text-center"> Reporting </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                          <Row className="justify-content-md-center mt-2 mb-4 mx-2">
                                            <div  style={{color: "grey", fontSize: "large"}}>
                                              You are not sure what impact your donation has? 
                                            </div>
                                          </Row>
                                          <Image src={vision} />
                                          <Row className="justify-content-md-center mt-5 mx-2">
                                            <div style={{color: "grey", fontSize: "large"}}>
                                              Use the Reporting page to get a feeling for the impact a donation has on a given ESG-subfactor.
                                            </div>
                                          </Row>
                                          <Row className="justify-content-md-center mt-3 mx-2">
                                            <div style={{color: "grey", fontSize: "large"}}>
                                              Find out which SDGs are important and concentrate your donation decisions on the important factors.
                                            </div>
                                          </Row>
                                          <Row className="justify-content-md-center mb-2 mt-3 mx-2">
                                            <div style={{color: "grey", fontSize: "large"}}>
                                              Update the Reporting page with the data you use for the Donation Cards. The more data you use the more this side can help you find the right donation decision
                                            </div>
                                          </Row>
                                        </Modal.Body>
                                      </Modal>
                                
                            </Col>
                            </Row>
                        </Card.Body>                     
                    </Card>
                
            </Row>
        </Col>
        </Row>
        </Container>
    )
}

export default HomeToShow;