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


const Home = () => {
  const test_sum = "Mit dem Gesetz werden aufgrund europarechtlicher Vorgaben verschiedene nationale Gesetze angepasst. Die Rechtsakte müssen entweder bis Mitte Juni 2021 umgesetzt sein oder kommen ab Ende 2021 oder Anfang 2022 erstmals zur Anwendung, sodass die nationalen Rechtsvorschriften bis dahin angepasst werden müssen. Von Bedeutung ist hier insbesondere die EU-Verordnung zur Regelung von Schwarmfinanzierungsdienstleistern, die über ihre Plattformen Kredite vermitteln. Neben einer Haftung für die Angaben im Anlageninformationsblatt werden Bußgeldtatbestände eingeführt, die zum Tragen kommen, wenn gegen die Vorgaben der EU-Verordnung verstoßen wird. Im Übrigen sind die inhaltlichen Anforderungen an die Schwarmfinanzierung in der EU-Verordnung selbst enthalten und gelten daher unmittelbar auch im Inland. Das Gesetz trägt weiter zur Umsetzung der Verordnung über ein Paneuropäisches Privates Pensionsprodukt („PEPP“) (PEPP-VO). Aufgrund dieser Verordnung werden insbesondere Sanktionsregelungen bei Verstößen gegen die PEPP-VO in das Wertpapierhandelsgesetz eingefügt, die auch für andere Aufsichtsgesetze gelten. Weiter finden sich im Gesetzentwurf Regelungen zur Umsetzung der EU-Verordnung zur Sanierung und Abwicklung von Zentralen Gegenparteien (Central Counterparties, CCPs). CCPs nehmen eine Schlüsselfunktion auf den Finanzmärkten ein, indem sie bei Transaktionen mit verschiedenen Finanzinstrumenten zwischen die Vertragsparteien treten und somit sowohl Käufer für jeden Verkäufer als auch Verkäufer für jeden Käufer sind.  Schließlich werden vor dem Hintergrund der Erfahrungen aus der Insolvenz eines Factoringinstituts verschiedene Vorschriften im Kreditwesengesetz erweitert. Damit wird u. a. der Instrumentenkasten der Bundesanstalt für Finanzdienstleistungsaufsicht  zur Stärkung der Factoringaufsicht angepasst. Insbesondere sollen künftig immer zwei Geschäftsführer vorhanden sein, um Manipulationen zu erschweren. Außerdem wird das Börsengesetz geändert. Mit der Änderung wird die bislang nur eingeschränkte Anwendbarkeit der in der Abgabenordnung enthaltenen Auskunfts-, Vorlage-, Amtshilfe- und Anzeigepflichten der Börsen gegenüber Steuerbehörden im Bereich des Börsengesetzes so erweitert, dass diese für sämtliche Steuerstrafverfahren gelten. Hierzu wird die bestehende Regelung zum Informationsaustausch mit den Steuerbehörden an entsprechende Regelungen im Bank- und Wertpapieraufsichtsrecht angepasst."
  const test_tos = "Referentenentwurf\n des Bundesministeriums der Finanzen\n Entwurf eines Gesetzes zur begleitenden Ausführung der Verordnung\n (EU) 2020/1503 und der Umsetzung der Richtlinie EU 2020/1504 zur Regelung von Schwarmfinanzierungsdienstleistern (Schwarmfinanzierung-Begleitgesetz)\n\n"
  // credentials for openai
  let openai  =  require("openai-node");
  openai.api_key  = "";

  const[law, setLaw] = useState({
    name: "",
    rawContent: "",
    metaData: "",
    summary: "",
    existingPolicy: "",
    amendedPolicy: "",
    tos: "",
    
  });

  const updateLaw = (value, attribute) => {
    let updated = {};
    updated[attribute] = value;
    console.log(value)
    setLaw({ ...law, ...updated });
  };
 
  // summary requ.
  const summary = (scraped_sum) => { 
    openai.Completion.create({
      engine: "davinci",
      prompt: `Mein Anwalt fragte mich was dieses Gesetz bedeuted:\n\n'''\n ${scraped_sum}\n'''\ntl;dr:\n'''`,
      temperature: 0.25,
      max_tokens: 306,
      top_p: 0.5,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: false,
      logprobs: null,
      echo: false,
      best_of: 1,
      stop: "'''",
    }).then((response) => {
      console.log(response);
      updateLaw(response.choices[0].text, "summary")
      //EXAMPLE OUTPUT: She didn't go to the market.
    });
  };
  useEffect(() => {
    tos(test_tos)
  }, []);

  // Type of law, Organization, Status of Law
  const tos = (law) => { 
    console.log(law)
    openai.Completion.create({
      engine: "davinci",
      prompt: `Aus dem Text finden wir "Type of law", "Organization", "Status of law", "Name of this Version".\n###\nUnsinnsentwurf\nder Bundesregierung\nEntwurf eines Verordnung zur Umsetzung der Richtlinie 2014/91/EU zur\nÄnderung der Richtlinie 2009/65/EG zur Koordinierung der Rechts- und\nVerwaltungsvorschriften betreffend bestimmte Organismen für gemeinsame Anlagen in Wertpapieren (OGAW) im Hinblick auf die Aufgaben der Verwahrstelle, die Vergütungspolitik und Sanktionen (OGAW-V-Umsetzungsgesetz – OGAW-V-UmsG)\nName of this Version: Unsinnsentwurf;\nType of law: Verordnung;\nOrganization: Bundesregierung;\nStatus of Law: Entwurf;\n###\n
      ${law}`,
      //prompt: `Aus dem Text finden wir "Type of law", "Organization", "Status of law", "Name of this Version".\n
      //###\n
      //Unsinnsentwurf\n
      //der Bundesregierung\n
      //Entwurf eines Verordnung zur Umsetzung der Richtlinie 2014/91/EU zur\n
      //Änderung der Richtlinie 2009/65/EG zur Koordinierung der Rechts- und\n
      //Verwaltungsvorschriften betreffend bestimmte Organismen für gemeinsame Anlagen in Wertpapieren (OGAW) im Hinblick auf die Aufgaben der Verwahrstelle, die Vergütungspolitik und Sanktionen
      //(OGAW-V-Umsetzungsgesetz – OGAW-V-UmsG)\n
      //Name of this Version: Unsinnsentwurf;\n
      //Type of law: Verordnung;\n
      //Organization: Bundesregierung;\n
      //Status of Law: Entwurf;\n
      //###\n
      temperature: 0.06,
      max_tokens: 200,
      top_p: 0.2,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: false,
      logprobs: null,
      n: 1,
      echo: false,
      best_of: 1,
      stop: "###",
    }).then((response) => {
      console.log(response);
      updateLaw(response.choices[0].text, "summary")
      //EXAMPLE OUTPUT: She didn't go to the market.
    });
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
                  <Form.Control plaintext readOnly defaultValue={law.summary} />
                </Col>
              </Form.Group>
            </Form>
        </Container>
      </>
  );
};

export default Home;