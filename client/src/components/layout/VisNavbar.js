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
                <Nav.Link as={Link} to="/analyze" active="/analyze">
                  <div className="navbar-light navbar-nav nav-link"  style={{ fontSize: "large" }}>
                    Analyze
                  </div>
                </Nav.Link>
                <Nav.Link as={Link} to="/implement" active="/implement">
                  <div className="navbar-light navbar-nav nav-link"  style={{ fontSize: "large" }} >
                    Implement 
                  </div>
                </Nav.Link>                
              </Nav>
            </Navbar.Collapse>
          </Navbar.Collapse>

      </Navbar>
      
      </>
  );
};

export default VisNavbar;