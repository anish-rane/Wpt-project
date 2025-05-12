import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function AboutUs() {
  return (
    <Container className="mt-4 ">
      <h2>About Us</h2>
      <Row>
        <Col sm={12} md={4}>
          <Card>
            <Card.Img variant="top" src="src\assets\photo.jpg" />
            <Card.Body  >
              <Card.Title>Anish Rane</Card.Title>
              <Card.Text>Project Manager</Card.Text>
              <Card.Text><a href='http://www.linkedin.com/in/anish-rane-b23621205'>LinkidIn</a></Card.Text>
              <Card.Text>Email us: anishrane292002@gmail.com</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card>
            <Card.Img variant="top" src="\src\assets\khursange.png" />
            <Card.Body >
              <Card.Title>Abhishek Khursange</Card.Title>
              <Card.Text>Lead Developer</Card.Text>
              <Card.Text><a href='http://www.linkedin.com/in/abhishek-khursange7'>LinkidIn</a></Card.Text>
              <Card.Text>Email us: abhishekkhursange63@gmail.com</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={4}>
          <Card>
            <Card.Img variant="top" src="\src\assets\Sakre.png" />
            <Card.Body>
              <Card.Title>Akash Sakhare</Card.Title>
              <Card.Text>UI/UX Designer</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
