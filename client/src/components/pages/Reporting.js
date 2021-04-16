import React, { useEffect, useContext, useState, Component } from "react";
import useSWR from "swr";
import Fuse from "fuse.js";

import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";

import Test from "../pages/vertida"

import { Line as LineChart, Chart } from "react-chartjs-2";


import {Link} from "react-router-dom"

import { useHistory } from "react-router-dom";

import GoalsOrder from "../../assests/GoalsOrder.png"


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
    Tooltip,
    OverlayTrigger
  } from "react-bootstrap";

  import vision from "./../../assests/icons/vision.png"

  import Select, { components } from 'react-select';

  import styled from 'styled-components';
import { faTruckMonster } from "@fortawesome/free-solid-svg-icons";

const readXlsxFile = require('read-excel-file/node');

  const Reporting = () => {
    let history = useHistory();

    const educationY = 0;
    const educationX = 3.24;

    const tresholdLow = 0.005;
    const tresholdMed = 0.015;
    const teshholdHigh = 0.03;

    const tresholdLow2 = 1;
    const tresholdMed2 = 2;
    const teshholdHigh2 = 4;

    const govY = 9.097;
    const govX = 5.007;

    const educationLabels = ["0 €", "40000 €", "80000 €", "120000 €", "160000 €", "200000 €", "240000 €", "280000 €", "320000 €", "360000 €", "400000 €"]
    const educationData = educationLabels.map((n, index) => {
      return 0.002025 * 2 * index;
    })
    const medData = [];
    const highData = [];
    const lowData = [];
    educationLabels.map(() => {
      lowData.push(tresholdLow);
      medData.push(tresholdMed);
      highData.push(teshholdHigh);
    })

    const medData2 = [];
    const highData2 = [];
    const lowData2 = [];
    educationLabels.map(() => {
      lowData2.push(tresholdLow2);
      medData2.push(tresholdMed2);
      highData2.push(teshholdHigh2);
    })

    const envLabels = educationLabels.map((n, index) => {
      return String(index * 0.25) + " Kwh" 
    })

    const envData = educationLabels.map((n, index) => {
      return  index * 1.25
    })
    

    const chartData = () => {
        return {
          labels: educationLabels,
          datasets: [
            {
              label: 'Donation Amount',
              fillColor: 'rgba(220,220,220,0.2)',
              strokeColor: 'rgba(220,220,220,1)',
              pointColor: 'rgba(220,220,220,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(220,220,220,1)',
              data: educationData,
              fill: false,
              borderColor: "#009"
              
            },
            {
              label: 'Limited Impact',
              fillColor: 'rgba(220,220,220,0.2)',
              strokeColor: 'rgba(220,220,220,1)',
              pointColor: 'rgba(220,220,220,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(220,220,220,1)',
              data: lowData,
              fill: false,
              
            },
            {
              label: 'Considerable Impact',
              fillColor: 'rgba(220,220,220,0.2)',
              strokeColor: 'rgba(220,220,220,1)',
              pointColor: 'rgba(220,220,220,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(220,220,220,1)',
              data: medData,
              fill: false,
              
            },
            {
              label: 'Significant Impact',
              fillColor: 'rgba(220,220,220,0.2)',
              strokeColor: 'rgba(220,220,220,1)',
              pointColor: 'rgba(220,220,220,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(220,220,220,1)',
              data: highData,
              fill: false,
              
            },
            
          ]
        }
      }
      
      const options = {
        scaleShowGridLines: true,
        scaleGridLineColor: 'rgba(0,0,0,.05)',
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        bezierCurve: true,
        bezierCurveTension: 0.4,
        pointDot: true,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 2,
        datasetFill: true,
        scales :{
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "% of Students with ICT skills"
            }
          }]
        },
        legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
      }

      const options2 = {
        scaleShowGridLines: true,
        scaleGridLineColor: 'rgba(0,0,0,.05)',
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        bezierCurve: true,
        bezierCurveTension: 0.4,
        pointDot: true,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 2,
        datasetFill: true,
        scales :{
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "% of consumption from renewable sources"
            }
          }]
        },
        legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
      }

     

        const chartData2 = () => {
          return {
              labels:envLabels,
              datasets: [{ 
                  data: envData,
                  label: "Kwh energy intensity",
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: lowData2,
                  label: "Limited Impact",
                  
                  fill: false
                }, { 
                  data: medData2,
                  label: "Considerable Impact",
                  
                  fill: false
                }, { 
                  data: highData2,
                  label: "Significant Impact",
                  
                  fill: false
                },
              ]
            
          }
        }
        
      
   

      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      const [showRep, setShowRep] = useState(false);
      const handleCloseRep = () => setShowRep(false);
      const handleShowRep = () => setShowRep(true);
      
      
    

      return (
        <Container fluid className="text-center pt-3">
          <Row className="justify-content-center">
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
          </Row>
          <Row className="mt-2">
            <Col className="mt-5">    
              <LineChart 

                type= "line"
                data={chartData}
                options={options}
                width="80" height="20"/>
            </Col>
            <Col style={{backgroundColor: "#e4d6ff"}}>
              <Row className="justify-content-md-center mt-4">
                <Col>
                  <h5 >
                    Quality Education 
                  </h5>
                  <div style={{color: "grey"}} className="mt-4">
                    With donating 300 000 Euro<br></br> into children's access to primary education,<br></br> you can increase the % of Students with good ICT skills by  <br></br>
                     <strong> 0.3%</strong> 
                  </div>
                  <Button variant="Card" className="mt-4" onClick={() => history.push("/database")}>
                    more info
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <hr></hr>
          <Row className="mt-3">
          <Col style={{backgroundColor: "#e4d6ff"}} >
              <Row className="justify-content-md-center mt-4">
                <Col>
                  <h5 >
                    Climate Action
                  </h5>
                  <div style={{color: "grey"}} className="mt-4">
                    Increasing the energy intensity by <strong>1 Kwh</strong>,<br></br>will increase the final consumption from renewable sources<br></br>by approximately <strong>5 %</strong>
                    
                  </div>
                  <Button variant="Card" className="mt-4" onClick={() => history.push("/database")}>
                    more info
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col className="mt-5">
            <LineChart 
              
              type= "line"
              data={chartData2}
              options={options2}
              width="80" height="20"/>
            </Col>
          </Row>
          <hr></hr>
          <Row className="justify content-center mt-4">
            <Col>
            <h5>don't know in which sdg you want to donate in? </h5>
            <div>get help by the OECD!</div>
            <Button className="justify content-center mt-3" variant="Vis3" style={{width: "300px"}} onClick={handleShow}>
                    more info  
            </Button>
            <Modal
              //style={{height: "2000px", width: "2000px"}}
              show={show}
              onHide={handleClose}
              backdrop="dynamic"
              keyboard={false}
              size="xl"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title className="text-align-center"> OECD and New America alligned the sustainabillity goals by its importance </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Image src={GoalsOrder} style={{height: "100%", width: "100%"}} />
              </Modal.Body>
              
              </Modal>
              </Col>
            </Row>
          </Container>
        
      )
  }

  export default Reporting;