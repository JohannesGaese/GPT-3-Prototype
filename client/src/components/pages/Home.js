import React, { useEffect, useContext, useState } from "react";
import useSWR from "swr";
import Fuse from "fuse.js";

import axios from "axios";

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




const Home = () => {
    const[law, setLaw] = useState({
      name: "",
      rawContent: "",
      metaData: "",
      summary: "",
      existingPolicy: "",
      amendedPolicy: "",
      
    });

    const updateLaw = (value, attribute) => {
      let updated = {};
      updated[attribute] = value;
      console.log(value)
      setLaw({ ...law, ...updated });
    };

   

    return (
        <>
          <Container  fluid className="text-center pt-3" /*style={{backgroundColor: "#e4d6ff"}}*/>
              <div className="mt-2 lg">
                Test Content
              </div>
              <p>
                hallo
              </p>
              <Form>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Law
                  </Form.Label>
                  <Col sm="9">
                    <Form.Check
                      inline
                      value="law1"
                      checked={law.name == "law1"}
                      type="radio"
                      label="Law1"
                      name="law1"
                      onChange={(e) => updateLaw(e.target.value, "name")}
                      
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Law
                  </Form.Label>
                  <Col sm="9">
                    <Form.Check
                      inline
                      value="law2"
                      checked={law.name == "law2"}
                      type="radio"
                      label="Law2"
                      name="law2"
                      onChange={(e) => updateLaw(e.target.value, "name")}
                      
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Scrape the Law
                  </Form.Label>
                  <Col sm="9">
                    <Button
                      variant="secondary"
                      onClick={(e) => updateLaw("lel", "rawContent")}
                    >
                      Scrape
                    </Button>
                  
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Output
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control plaintext readOnly defaultValue="email@example.com" />
                  </Col>
                </Form.Group>
                <h3>
                  Foundings
                </h3>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    M1
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control plaintext readOnly defaultValue="email@example.com" />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="3">
                    Summary
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control plaintext readOnly defaultValue="email@example.com" />
                  </Col>
                </Form.Group>
              </Form>
          </Container>
        </>
    );
};

export default Home;