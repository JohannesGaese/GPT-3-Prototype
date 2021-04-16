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
    Carousel
  } from "react-bootstrap";

import 'react-slideshow-image/dist/styles.css'
import { useHistory } from "react-router-dom";
import Bild2 from "./../../assests/Bild2.png"
import { Slide } from 'react-slideshow-image';
import slide2 from "./../../assests/slides/slide2.jpg"
import slide1 from "./../../assests/slides/slide1.jpg"
import slide3 from "./../../assests/slides/slide3.png"



const slideImages = [
    'images/slide_2.jpg',
    'images/slide_3.jpg',
    'images/slide_4.jpg'
  ];

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true
  }


const LandingPage = () => {
    let history = useHistory();
    return (
        <Container fluid className="text-center" style={{backgroundColor: "#e4d6ff" }}>
            <Row>
                <Image src={Bild2} />
            </Row>
            <Row className="justify-content-center">
                <h1 className="mt-3">visibleImpact</h1>
            </Row>
            <Row className="justify-content-center mt-3">
                <Col lg={3}>
                    <div>
                        With our tool you can choose the foucs of the donation you want to evaluate among Environmental, Social, and Governance factors
                    </div>
                </Col>
            </Row>
            <Row className="mt-5 justify-content-center">
                <Button
                    style={{ backgroundColor: "black", width: "200px"}}
                    onClick={(e) => history.push("/home")}
                >
                    Get started
                </Button>
            </Row>
            <Row className="mt-5 justify-content-center">
            <Carousel style={{width: "900px", height: "700px"}}>
                  <Carousel.Item style={{width: "700", height: "500px"}}>
                    <img
                      className="d-block w-100"
                      src={slide1}
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h2>ENGAGING</h2>
                      <p>You always know where, how, and what to donate</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item style={{width: "700", height: "500px"}}>
                    <img
                      className="d-block w-100"
                      src={slide2}
                      alt="Third slide"
                    />

                    <Carousel.Caption>
                      <h3>SIMPLE</h3>
                      <div>Just 3 steps to quantify</div>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item style={{width: "700", height: "500px"}}>
                    <img
                      className="d-block w-100"
                      src={slide3}
                      alt="Third slide"
                      style={{width: "700", height: "500px"}}
                    />

                    <Carousel.Caption>
                      <h3>GUARANTEED</h3>
                      <p>An empirical model based on scientific research</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
            </Row>

        </Container>
    )
};

export default LandingPage