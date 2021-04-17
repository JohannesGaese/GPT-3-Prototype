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
      existingPolicy: "",
      amendedPolicy: "",
      
    });

    const updateLaw = (value, attribute) => {
      let updated = {};
      updated[attribute] = value;
      console.log(value)
      setLaw({ ...law, ...updated });
    };

    let openai  =  require("openai-node");

  //   openai.api_key  =  "";

  // useEffect(() => {
  //   openai.Completion.create({
  //     engine: "ada",
  //     prompt: "Mein Anwalt fragte mich was dieses Gesetz bedeuted: \n'''\n Mit dem Gesetz werden aufgrund europarechtlicher Vorgaben verschiedene nationale Gesetze angepasst. Die Rechtsakte müssen entweder bis Mitte Juni 2021 umgesetzt sein oder kommen ab Ende 2021 oder Anfang 2022 erstmals zur Anwendung, sodass die nationalen Rechtsvorschriften bis dahin angepasst werden müssen. Von Bedeutung ist hier insbesondere die EU-Verordnung zur Regelung von Schwarmfinanzierungsdienstleistern, die über ihre Plattformen Kredite vermitteln. Neben einer Haftung für die Angaben im Anlageninformationsblatt werden Bußgeldtatbestände eingeführt, die zum Tragen kommen, wenn gegen die Vorgaben der EU-Verordnung verstoßen wird. Im Übrigen sind die inhaltlichen Anforderungen an die Schwarmfinanzierung in der EU-Verordnung selbst enthalten und gelten daher unmittelbar auch im Inland. Das Gesetz trägt weiter zur Umsetzung der Verordnung über ein Paneuropäisches Privates Pensionsprodukt („PEPP“) (PEPP-VO). Aufgrund dieser Verordnung werden insbesondere Sanktionsregelungen bei Verstößen gegen die PEPP-VO in das Wertpapierhandelsgesetz eingefügt, die auch für andere Aufsichtsgesetze gelten. Weiter finden sich im Gesetzentwurf Regelungen zur Umsetzung der EU-Verordnung zur Sanierung und Abwicklung von Zentralen Gegenparteien (Central Counterparties, CCPs). CCPs nehmen eine Schlüsselfunktion auf den Finanzmärkten ein, indem sie bei Transaktionen mit verschiedenen Finanzinstrumenten zwischen die Vertragsparteien treten und somit sowohl Käufer für jeden Verkäufer als auch Verkäufer für jeden Käufer sind.  Schließlich werden vor dem Hintergrund der Erfahrungen aus der Insolvenz eines Factoringinstituts verschiedene Vorschriften im Kreditwesengesetz erweitert. Damit wird u. a. der Instrumentenkasten der Bundesanstalt für Finanzdienstleistungsaufsicht  zur Stärkung der Factoringaufsicht angepasst. Insbesondere sollen künftig immer zwei Geschäftsführer vorhanden sein, um Manipulationen zu erschweren. Außerdem wird das Börsengesetz geändert. Mit der Änderung wird die bislang nur eingeschränkte Anwendbarkeit der in der Abgabenordnung enthaltenen Auskunfts-, Vorlage-, Amtshilfe- und Anzeigepflichten der Börsen gegenüber Steuerbehörden im Bereich des Börsengesetzes so erweitert, dass diese für sämtliche Steuerstrafverfahren gelten. Hierzu wird die bestehende Regelung zum Informationsaustausch mit den Steuerbehörden an entsprechende Regelungen im Bank- und Wertpapieraufsichtsrecht angepasst.\n'''\ntl;dr:\n'''",
  //     temperature: 0.25,
  //     max_tokens: 182,
  //     top_p: 0.5,
  //     frequency_penalty: 0,
  //     presence_penalty: 0,
  //     n: 1,
  //     stream: false,
  //     logprobs: null,
  //     echo: false,
  //     best_of: 1,
  //     stop: "'''",
  //   }).then((response) => {
  //     console.log(response);
  //     updateLaw(response.choices[0].text, "summary")
  //     //EXAMPLE OUTPUT: She didn't go to the market.
  //   });
  // }, []);

   

    return (
        <>
          <Container  fluid className="text-center pt-3" /*style={{backgroundColor: "#e4d6ff"}}*/>
              <Container>
                <Row>
                  {/* Georg */}
                  <Col className="w-50">
                    <div>
                      <h2>Human Georg </h2>
                    </div>
                    <Card>
                      <Card.Body>
                        <Card.Title>Titel</Card.Title>
                        <Card.Text>
                          Gesetz zur begleitenden Ausführung der Verordnung (EU) 2020/1503 und der Umsetzung der Richtlinie (EU) 2020/1504 zur Regelung von Schwarmfinanzierungsdienstleistern - Änderung der Verordnung über die Erhebung von Gebühren und die Umlegung von Kosten nach dem Finanzdienstleistungsaufsichtsgesetz
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Card.Title>Hyperlink</Card.Title>
                        <Card.Text>
                        https://www.bundesfinanzministerium.de/Content/DE/Gesetzestexte/Gesetze_Gesetzesvorhaben/Abteilungen/Abteilung_VII/19_Legislaturperiode/2021-03-24-Schwarmfinanzierung-BegleitG/1-Referentenentwurf.pdf?__blob=publicationFile&v=3
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Card.Title>Date of Publication</Card.Title>
                        <Card.Text>
                          24.03.2021
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Card.Title>Name of this Version</Card.Title>
                        <Card.Text>
                          Referentenentwurf
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Card.Title>Type of Law</Card.Title>
                        <Card.Text>
                          Gesetzt
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Card.Title>Organization</Card.Title>
                        <Card.Text>
                          Bundesministerium der Finanzen
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Card.Title>Status of Law</Card.Title>
                        <Card.Text>
                          Entwurf
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Card.Title>Name of corresponding Laws</Card.Title>
                        <Card.Text>
                        Wertpapierhandelsgesetzes, Wertpapierprospektgesetzes, Vermögensanlagengesetzes, Wertpapierinstitutsgesetzes, Kreditwesengesetzes, Kapitalanlagegesetzbuchs, Sanierungs- und Abwicklungsgesetzes, Geldwäschegesetzes, Versicherungsaufsichtsgesetzes, Wertpapiererwerbs- und Übernahmegesetzes, Finanzdienstleistungsaufsichtsgesetzes, WpÜG-Beiratsverordnung, WpÜG-Widerspruchsausschuss-Verordnung, WpÜG-Gebührenverordnung,Verordnung über die Erhebung von Gebühren und die Umlegung  von Kosten nach dem Finanzdienstleistungsaufsichtsgesetz, Verordnung über die Erhebung von Gebühren und die Umlegung von Kosten nach dem Finanzdienstleistungsaufsichtsgesetz
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Card.Title>Summary</Card.Title>
                        <Card.Text>
                        The German Federal Ministry of Finance (*Bundesfinanzministerium *– BMF) published a Minister’s bill (dated as of 26 November 2020) on a draft law on the accompanying implementation of Regulation (EU) 2020/1503 and the implementation of Directive EU 2020/1504 regulating swarm finance service providers (*Schwarmfinanzierung-Begleitgesetz*). The draft law essentially serves to implement several legal acts of the European Union: (i) [Regulation (EU) 2020/1503](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32020R1503) and [Directive (EU) 2020/1504](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32020L1504) of 7 October 2020 on European Swarm Funding Service Providers; (ii) [Regulation (EU) 2019/1238](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32019R1238) of 20 June 2019 on a Pan-European Private Pension Product - PEPP (PEPP - VO); (iii) Regulation (EU) (to be promulgated in the Official Journal) on a framework for the recovery and resolution of central counterparties; and (iv) [Directive (EU) 2019/2177](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32019L2177) of 18 December 2019 amending rules on data reporting services, and amending [Directive (EU) 2015/849](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32015L0849) on the prevention of the use of the financial system for the purpose of money laundering and terrorist financing.

The legal acts must either be implemented by mid-June 2021 or will apply for the first time from the end of 2021 or the beginning of 2022, so national legislation will have to be adapted by then.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>

                  {/* GeorgPT-3 */}
                  <Col className="w-50">
                    <div>
                      <h2>GeorgPT-3</h2>
                    </div>
                    <Card>
                      <Card.Body>
                        <Card.Title>Titel</Card.Title>
                        <Card.Text>
                          {law.scraper.title}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Card.Title>Hyperlink</Card.Title>
                        <Card.Text>
                          {law.scraper.hyperlink}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Card.Title>Date of Publication</Card.Title>
                        <Card.Text>
                          {law.scraper.dateOfPublication}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Card.Title>Name of this Version</Card.Title>
                        <Card.Text>
                        {law.metaData.nameOfthisVersion}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Card.Title>Type of Law</Card.Title>
                        <Card.Text>
                        {law.metaData.typeOfLaw}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Card.Title>Organization</Card.Title>
                        <Card.Text>
                        {law.metaData.organization}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Card.Title>Status of Law</Card.Title>
                        <Card.Text>
                        {law.metaData.statusOfLaw}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Card.Title>Name of corresponding Laws</Card.Title>
                        <Card.Text>
                        {law.metaData.namesOfCorrespondingLaws}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card>
                      <Card.Body>
                        <Card.Title>Summary</Card.Title>
                        <Card.Text>
                        {law.summary}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            
          </Container>
        </>
    );
};

export default Home;