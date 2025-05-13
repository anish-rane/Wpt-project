import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function AboutUs() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Background Image with Blur */}
      <img
        src="\src\assets\aboutus_bg.jpg" // 🔁 Make sure the image exists in public/assets/
        alt="background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'blur(8px)',
          zIndex: 0,
        }}
      />

      {/* Foreground Content */}
      <Container
        style={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '3rem 1rem',
          borderRadius: '12px',
          color: 'white',
          marginTop: '2rem',
        }}
      >
        <h2 className="text-center mb-5">Meet Our Team</h2>
        <Row className="g-4 justify-content-center">
          <Col sm={12} md={4}>
            <Card className="h-100 shadow-lg">
              <Card.Img
                variant="top"
                src="/src/assets/photo.jpg"
                style={{ height: '250px', objectFit: 'contain', padding: '10px' }}
              />
              <Card.Body>
                <Card.Title className="text-center">Anish Rane</Card.Title>
                <Card.Text className="text-center text-muted">Project Manager</Card.Text>
                <Card.Text className="text-center">
                  <a href="https://linkedin.com/in/anish-rane-b23621205" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Card.Text>
                <Card.Text className="text-center small">anishrane292002@gmail.com</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} md={4}>
            <Card className="h-100 shadow-lg">
              <Card.Img
                variant="top"
                src="/src/assets/khursange.png"
                style={{ height: '250px', objectFit: 'contain', padding: '10px' }}
              />
              <Card.Body>
                <Card.Title className="text-center">Abhishek Khursange</Card.Title>
                <Card.Text className="text-center text-muted">Lead Developer</Card.Text>
                <Card.Text className="text-center">
                  <a href="https://linkedin.com/in/abhishek-khursange7" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Card.Text>
                <Card.Text className="text-center small">abhishekkhursange63@gmail.com</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={12} md={4}>
            <Card className="h-100 shadow-lg">
              <Card.Img
                variant="top"
                src="/src/assets/Sakre.png"
                style={{ height: '250px', objectFit: 'contain', padding: '10px' }}
              />
              <Card.Body>
                <Card.Title className="text-center">Akash Sakhare</Card.Title>
                <Card.Text className="text-center text-muted">UI/UX Designer</Card.Text>
                 <Card.Text className="text-center">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                  </Card.Text>
                <Card.Text className="text-center small">akashsakhare@example.com</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
