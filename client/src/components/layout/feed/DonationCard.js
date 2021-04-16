import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

import { Card, Row, Nav, Tab, CardGroup, CardDeck, Button, Link } from "react-bootstrap";

import { useHistory } from "react-router-dom";

import unicef from "./../../../assests/unicef.jpg";
import whatUnicefDoes3 from "../../../assests/whatUnicefDoes3.PNG";
import whatUnicefDoes2 from "../../../assests/whatUnicefDoes2.PNG";
import DonationPic from "./../../../assests/DonationPic.png"

import { Tabs, TabList, TabPanel } from 'react-tabs';

//import { NavigationActions } from 'react-navigation'



/**
 * @name DonationCard
 * @desc Single item representing each entry in the donation card feed
 * @param {Object} props
 */
const DonationCard = (props) => {

  const [dateOfPublicationShown, setDateOfPublicationShown] = useState("");
  //const [tabIndex, setTabIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState("Donation");


  let history = useHistory();
  

  const links = ["Donation", "Impact", "Organisation"];

  //useEffect(() => {
  //  setDateOfPublicationShown(
  //    props.law.dateOfPublication
  //      ? new Date(donation.dateOfPublication).toLocaleDateString("en-EN", {
  //          day: "numeric",
  //          year: "numeric",
  //          month: "long",
  //        })
  //      : dateOfPublicationShown
  //  );
  //}, []);

  console.log(props.donation)
  

  const changeTab = (item) => {
      setCurrentTab(item)
      console.log(currentTab)
    
  }
 
  const circleStyle = {
    padding:10,
    margin:20,
    display:"inline-block",
    backgroundColor: "black",
    borderRadius: "50%",
    width: 60,
    height:60,
  };

  return (
    
    <div className="justify-content-md-center mb-5">
      <Card className="px-3 pt-3 pb-3">
      <h5 >{props.donation.esgGoal}</h5>
      <CardDeck className="text-center " >
        
        <Card style={{background: "#e4d6ff"}}>
          <Card.Body>
          <div style={circleStyle}>
          </div>
            <Card.Title className="mb-5">Past Donation</Card.Title>
            <Card.Text style={{color: "grey"}}>
              {`Donation Amount - ${props.donation.amount}`}
            </Card.Text>
            <Card.Text style={{color: "grey"}}>
              {`Payment Frequency - ${props.donation.paymentFrequency}`}
            </Card.Text>
            <Card.Text style={{color: "grey"}}>
              {`Date - ${props.donation.projectStart}`}
            </Card.Text>
            <Card.Text style={{color: "grey"}}>
              {`Country - ${props.donation.country}`}
            </Card.Text>
            
          </Card.Body>
          <Card.Footer>
            <Button variant="Card" > {props.donation.titel} </Button>
          </Card.Footer>
          
          
          
        </Card>
        <Card style={{background: "#e4d6ff"}}>
          <Card.Body>
          <div style={circleStyle}>
          </div>
            <Card.Title className="mb-5">Organisation</Card.Title>
            <Card.Text style={{color: "grey"}}>
              {`${props.donation.orgName}`}
            </Card.Text>
            <Card.Text style={{color: "grey"}}>
              {`${props.donation.orgDescription}`}
            </Card.Text>
            <Card.Text style={{color: "grey"}}>
              {`${props.donation.partnerShip}`}
            </Card.Text>
            
          </Card.Body>
          <Card.Footer>
            <Button variant="grey" style={{borderColor: "grey", color: "grey"}}>
              <Card.Link 
                style={{color: "grey"}}
                href={props.donation.linkToOrganisation}
               target="_blank"
               rel="noopener noreferrer">Link to organisation</Card.Link>  </Button>
          </Card.Footer>
        </Card>
        <Card style={{background: "#e4d6ff"}}>
          <Card.Body>
          <div style={circleStyle}>
          </div>
            <Card.Title className="mb-5">{props.donation.sustainableGoal}</Card.Title>
            <Card.Text style={{color: "grey"}}>
              {`${props.donation.impact.achieved}`}
            </Card.Text>
            <Card.Text style={{color: "grey"}}>
              {`${props.donation.donationDescribtion}`}
            </Card.Text>
            <Card.Text style={{color: "grey"}}>
              {`Impact Score ${props.donation.impact.impactScore}`}
            </Card.Text>
            
          </Card.Body>
          <Card.Footer>
            <Button variant="black" style={{borderColor: "black"}} onClick={() => history.push("/cardpanel")}> Impact Score </Button>
          </Card.Footer>
        </Card>
      </CardDeck>
      </Card>
    </div>
  );
};


export default DonationCard;