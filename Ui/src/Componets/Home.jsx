import React from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import './Home.css';

export default function Home() {
  return (
    <div className="home-background d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <Container className="text-center text-white">
        <Alert variant=" warning " className="bg-warning bg-opacity-75">
          <h2>Welcome to Leave Management System</h2>
        </Alert>
        <p variant="success" className="lead">
          <b>
          Our Leave Management System helps staff members apply for leaves easily and lets managers efficiently approve, reject, or track leave requests. Start now and simplify your leave process!
        </b></p>
        <Button variant="primary" href="/signup">
          Get Started
        </Button>
      </Container>
    </div>
  );
}
