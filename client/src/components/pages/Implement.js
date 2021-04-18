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


const Implement = () => {
  const test_sum = "Mit dem Gesetz werden aufgrund europarechtlicher Vorgaben verschiedene nationale Gesetze angepasst. Die Rechtsakte müssen entweder bis Mitte Juni 2021 umgesetzt sein oder kommen ab Ende 2021 oder Anfang 2022 erstmals zur Anwendung, sodass die nationalen Rechtsvorschriften bis dahin angepasst werden müssen. Von Bedeutung ist hier insbesondere die EU-Verordnung zur Regelung von Schwarmfinanzierungsdienstleistern, die über ihre Plattformen Kredite vermitteln. Neben einer Haftung für die Angaben im Anlageninformationsblatt werden Bußgeldtatbestände eingeführt, die zum Tragen kommen, wenn gegen die Vorgaben der EU-Verordnung verstoßen wird. Im Übrigen sind die inhaltlichen Anforderungen an die Schwarmfinanzierung in der EU-Verordnung selbst enthalten und gelten daher unmittelbar auch im Inland. Das Gesetz trägt weiter zur Umsetzung der Verordnung über ein Paneuropäisches Privates Pensionsprodukt („PEPP“) (PEPP-VO). Aufgrund dieser Verordnung werden insbesondere Sanktionsregelungen bei Verstößen gegen die PEPP-VO in das Wertpapierhandelsgesetz eingefügt, die auch für andere Aufsichtsgesetze gelten. Weiter finden sich im Gesetzentwurf Regelungen zur Umsetzung der EU-Verordnung zur Sanierung und Abwicklung von Zentralen Gegenparteien (Central Counterparties, CCPs). CCPs nehmen eine Schlüsselfunktion auf den Finanzmärkten ein, indem sie bei Transaktionen mit verschiedenen Finanzinstrumenten zwischen die Vertragsparteien treten und somit sowohl Käufer für jeden Verkäufer als auch Verkäufer für jeden Käufer sind.  Schließlich werden vor dem Hintergrund der Erfahrungen aus der Insolvenz eines Factoringinstituts verschiedene Vorschriften im Kreditwesengesetz erweitert. Damit wird u. a. der Instrumentenkasten der Bundesanstalt für Finanzdienstleistungsaufsicht  zur Stärkung der Factoringaufsicht angepasst. Insbesondere sollen künftig immer zwei Geschäftsführer vorhanden sein, um Manipulationen zu erschweren. Außerdem wird das Börsengesetz geändert. Mit der Änderung wird die bislang nur eingeschränkte Anwendbarkeit der in der Abgabenordnung enthaltenen Auskunfts-, Vorlage-, Amtshilfe- und Anzeigepflichten der Börsen gegenüber Steuerbehörden im Bereich des Börsengesetzes so erweitert, dass diese für sämtliche Steuerstrafverfahren gelten. Hierzu wird die bestehende Regelung zum Informationsaustausch mit den Steuerbehörden an entsprechende Regelungen im Bank- und Wertpapieraufsichtsrecht angepasst."
  const test_tos = "Referentenentwurf\n des Bundesministeriums der Finanzen\n Entwurf eines Gesetzes zur begleitenden Ausführung der Verordnung\n (EU) 2020/1503 und der Umsetzung der Richtlinie EU 2020/1504 zur Regelung von Schwarmfinanzierungsdienstleistern (Schwarmfinanzierung-Begleitgesetz)\n\n"
  const test_ammendment = "Paneuropäisches Privates Pensionsprodukt (PEPP)"
  // credentials for openai
  let openai  =  require("openai-node");
  openai.api_key  = process.env.REACT_APP_API_KEY;

  const[law, setLaw] = useState({
    name: "",
    scraper: {
      titel: "",
      hyperlink: "",
      dateOfPublication: "",
    },
    rawContent: "",
    metaData: {
      nameOfthisVersion: "",
      typeOfLaw: "",
      organization: "",
      statusOfLaw: "",
      namesOfCorrespondingLaws: "",
    },
    summary: "",
    existingPolicy: `Produkt-Richtlinie v3.2 - Stand: 16.4.21
    Produkt-Richtlinie
    der
    InvestFix GmbH
    Meisengasse 8, 60313 Frankfurt am Main
    
    I. Vorwort
    Die InvestFix GmbH ("InvestFix") ist ein Finanzanlagenvermittler nach § 34f Absatz 1 der Gewerbeordnung (GewO).
    
    II. Beratungsgrundsätze
    Die InvestFix berät ehrlich, redlich und professionell im bestmöglichen Interesse ihrer Kunden. Sie hat einem Kunden, bevor es Geschäfte für ihn durchführt, die allgemeine Art und Herkunft von Interessenkonflikten und die zur Begrenzung der Risiken der Beeinträchtigung der Kundeninteressen unternommenen Schritte eindeutig darzulegen.
    
    III. Produktportfolio der InvestFix
    Abhängig von der Erfahrung und den Vorkenntnissen des Kunden, empfiehlt die InvestFix dem Kunden nach eingehender Beratung eines der folgenden Produkte:
    1. Anteil einer inländischen Kapitalanlagegesellschaft;
    2. Öffentlich angebotener Anteil an geschlossenem Fonds (z. B. Immobilienfonds, Lebensversicherungsfonds, Medienfonds);
    3. Unternehmensbeteiligung;
    4. Treuhandvermögen;
    5. Genussrecht;
    6. Direktinvestment (z.B. Edelmetall);
    7. Kapitalbildende Lebensversicherung.
    
    IV. Dokumentationspflichten
    Die Darlegung etwaiger Interessenkonflikte nach Ziffer II. sowie die Beratung und Geeignetheitsprüfung im Hinblick auf das vermittelte Anlageprodukt sind hinreichend detailliert in der Kundenkartei zu dokumentieren. Der Kunde hat die Dokumentation nach dem Beratungsgespräch zu unterzeichnen.`,
    amendedPolicy: "",
    
  });

  //Name of this Version: Referentenentwurf;
  //Type of law: Gesetz;
  //Organization: Bundesministerium der Finanzen;
  //Status of Law: Entwurf;

  const updateLaw = (value, attribute) => {
    let updated = {};
    updated[attribute] = value;
    console.log(value)
    setLaw({ ...law, ...updated });
  };

  const policyAmmendment = (policy, amendmend) => { 
    openai.Completion.create({
      engine: "davinci",
      prompt: `This is a tool that amends parts of a text
      ###
      Old version:
      I. Einführung
      Das ist eine Beschreibung der Tierwelt der Familie Mayer.
      
      II. Tiersammlung
      Familie Mayer hat die folgenden Tiere:
      1. Hunde
      2. Katzen
      3. Schildkröten.
      
      III. Tierpflege
      Die Tiere werden täglich gepflegt.
      
      IV. Besucher
      Besucher können die Tiere werktags besichtigen.
      ---
      Amend: Füge "Meerschweinchen (Test)" in die Tiersammlung ein.
      ---
      Amended text:
      II. Tiersammlung
      Familie Mayer hat die folgenden Tiere:
      1. Hunde
      2. Katzen
      3. Schildkröten
      4. Meerschweinchen.
      
      ###
      Old version:
      I. Einleitung
      Die toom GmbH ("toom") ist ein Baumarkt.
      
      II. Öffnungszeiten
      toom ist 24 Stunden geöffnet.
      
      III. Lieferung
      Eine Lieferung der Produkte ist nicht möglich.
      
      IV. Bauprodukte
      Toom verkauft die folgenden Baumaterialien:
      1. Pressspanplatten
      2. Ziegelsteine
      3. Holzlatten
      4. Wandfarbe.
      
      V. Anfertigung von Baumaterialien
      Baumaterialien können auch auf Kundenwunsch individuell angefertigt werden.
      ---
      Amend: Füge "Kleister" in die Bauprodukte ein.
      ---
      Amended text:
      II. Bauprodukte
      Toom verkauft die folgenden Baumaterialien:
      1. Pressspanplatten
      2. Ziegelsteine
      3. Holzlatten
      4. Wandfarbe
      5. Kleister.
      
      ###
      Old version: 
      ${policy}
      ---
      Amend: Füge ${amendmend} in das Produktportfolio ein.
      ---
      Amended text:`,
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
      updateLaw(response.choices[0].text, "amendedPolicy")
      //EXAMPLE OUTPUT: She didn't go to the market.
    });
  };

    return (
        <>
          <Container  fluid className="text-center pt-3" /*style={{backgroundColor: "#e4d6ff"}}*/>
              <Container>
                <Row>
                  {/* Georg */}
                  <Col className="w-50">
                    <div>
                      <h2>Old Policy</h2>
                    </div>
                    <Card className="card1">
                      <Card.Body>
                        <Card.Text>
                          {law.existingPolicy}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  {/* GeorgPT-3 */}
                  <Col className="w-50">
                    <div>
                      <h2>New Requirement</h2>
                    </div>
                    <Card className="card1">
                      <Card.Body>
                        <Card.Text>
                          {test_ammendment}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col className="w-50">
                    <div>
                      <h2>Ammended GPT-3 Policy</h2>
                    </div>
                    <Card className="card1">
                      <Card.Body>
                        <Card.Text>
                          {law.amendedPolicy}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row className="m-3">
                        <div className="m-auto">
                          <button className="button1" onClick={(e)=>policyAmmendment(law.existingPolicy, test_ammendment)}>Implement</button>
                        </div>
                      </Row>
              </Container>
            
          </Container>
        </>
    );
};

export default Implement;