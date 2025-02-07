import React from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';

const MyCarousel = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="images/2b0c79fb2e7ed3b0.webp"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="images/6a0b08a518b223cc.png"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="images/4537582dcf47fc82.jpg"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyCarousel;
