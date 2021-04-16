import React, { useContext, useEffect, useState } from "react";


import { Link, useLocation } from "react-router-dom";


import {
    Navbar,
    Form,
    Button,
    Dropdown,
    DropdownButton,
    Col,
    Row,
    Collapse,
    Nav,
    InputGroup,
    FormGroup,
    Modal,
    FormControl
  } from "react-bootstrap";

/* Navigation through the tool */

const VisNavbar = () => {

  let location = useLocation();
  
  const [loggedIn, setLoggedIn] = useState("");
  console.log(loggedIn)
  useEffect(() => {
      if (loggedIn === "false") {
        setLoggedIn("false");
      } else {
        setLoggedIn("true")
      }
  }, [loggedIn])
  const login = (login) => {
    if (login === "true") {
      setLoggedIn("true");
    } else {
      setLoggedIn("false");
    }
  } ;
  
  
  return (
      <>
        <Navbar 
          className="nav-VIS1"
          variant="#white" 
          >
          <Navbar.Brand
            as={Link} 
            to="/home"
          >
            {/*<img
            
              src={Bild2}
              height="50"
              
              className="d-inline-block mx-3"
              
            />
            */}
          </Navbar.Brand>
          <h3>GEORG</h3>
          <Navbar.Collapse>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav 
                className="mx-3 mr-auto"
                >

                <Nav.Link as={Link} to="/home" active="/home">
                  <div className="navbar-light navbar-nav nav-link"  style={{ fontSize: "large" }}>
                    Home
                  </div>
                </Nav.Link>
                {loggedIn && (
                  <Nav.Link as={Link} to="/impactcalculator">
                  <div className="navbar-light navbar-nav nav-link" style={{ fontSize: "large" }} variant="white">
                    Impact Calculator
                  </div>
                </Nav.Link>
                )}
                <Nav.Link as={Link} to="/reporting" >
                  <div className="navbar-light navbar-nav nav-link"  style={{ fontSize: "large" }} >
                    Reporting 
                  </div>
                </Nav.Link>
                
                {loggedIn && (
                  <Nav.Link as={Link} to="/database">
                  <div className="navbar-light navbar-nav nav-link" style={{ fontSize: "large" }} variant="white">
                    Database
                  </div>
                </Nav.Link>
                )}
                
              </Nav>
            </Navbar.Collapse>
          </Navbar.Collapse>
          
          {loggedIn === "false" && (
          <Form inline>
            <FormControl type="text" placeholder="email" className="mr-sm-2" />
            <FormControl type="text" placeholder="password" className="mr-sm-2" />
            <Button variant="outline-info" onClick={login("true")}>Submit</Button>
          </Form>
          )}
          
          {loggedIn ==="true" && (
            <Navbar.Collapse className="justify-content-end m50">
              <DropdownButton 
                
                title="Allen & Overy LLP"
                alignRight
              >
                <Dropdown.Item as={Link} /*to="/settings"*/>
                  User Settings
                </Dropdown.Item>
                <Dropdown.Item onClick={() => login("false")}>Logout</Dropdown.Item>
              </DropdownButton>
            </Navbar.Collapse>

          )}
      </Navbar>
      
      </>
  );
};

export default VisNavbar;