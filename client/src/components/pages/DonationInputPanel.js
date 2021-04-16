import React, { useEffect, useContext, useState } from "react";
import useSWR from "swr";
import Fuse from "fuse.js";

import { FilterContext } from "../../context/FilterContext";

import Filter from "../layout/feed/Filter";
import CardInput from "../layout/feed/CardInput";

import DonationPic from "./../../assests/DonationPic.png";
import iconWorld from "./../../assests/icons/iconWorld.png"

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
    Modal, 
    Tooltip,
    Image,
    OverlayTrigger
  } from "react-bootstrap";

const DonationInputPanel = () => {
    const {
      getFilteredDonationCards,
      cardFilter
    } = useContext(FilterContext)

    const divStyle = {
      width: '88%',
      height: '100%',
      backgroundImage: `url(${DonationPic})`,
      backgroundSize: 'cover',
      backgroundSize: 'cover'
    }
    console.log(divStyle.backgroundImage)

    const [showCalc, setShowCalc] = useState(false);
  const handleCloseCalc = () => setShowCalc(false);
  const handleShowCalc = () => setShowCalc(true);
    return (
      <>
      
        <Container fluid >
        
        <h3 className="text-center mt-5 mb-5">Please use this page to calculate you impact and its score <OverlayTrigger
                                  placement="right"
                                  overlay={<Tooltip id={`tooltip-1`}>
                                  Need help with the <strong>Impact Calculator?</strong>
                                </Tooltip>}
                                >
                                    <Button
                                      variant="Vis1"
                                      
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
                                      </Modal> </h3>
        
        

          <Row className="mt-5 justify-content-center"> 

            <Col className="justify-content-md-center mt-5 mb-5" lg= {10} md={10} >
              <CardInput className="text-center" cardFilter />
            </Col>

          </Row>
          
        </Container>
      
      </>
    )
};

export default DonationInputPanel;