import React from 'react'
import { Row, Col, Image, Container } from 'react-bootstrap';

const Cartorder = ({ name, image, price, quantity }) => {
  return (
    <Container>
      <Row className="align-items-center my-2">
        <Col xs={3}>
          <Image src={image} rounded height={50} />
        </Col>
        <Col xs={5}>
          <h6>{name}</h6>
        </Col>
        <Col xs={2}>
          <span>{quantity}</span>
        </Col>
        <Col xs={2}>
          <span>${price}</span>
        </Col>
      </Row>
    </Container>
  );
};

export default Cartorder
