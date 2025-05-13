import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Button, Form, Card } from 'react-bootstrap';
import './Contactus.css'

export default function ContactUs() {
  const [message, setMessage] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return alert('Please enter your message.');

    fetch('http://localhost:7800/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, message })
    })
      .then(res => res.json())
      .then(() => {
        alert('Feedback sent!');
        setMessage('');
        if (role === 'manager') fetchFeedbacks(); // refresh for manager
      })
      .catch(err => alert('Error sending feedback.'));
  };

  const fetchFeedbacks = () => {
    fetch('http://localhost:7800/feedbacks')
      .then(res => res.json())
      .then(data => setFeedbacks(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (role === 'manager') fetchFeedbacks();
  }, [role]);

  return (
    <div className="contact-bg">
      <Container className="py-4 text-white">
        
        <Row>
          <Col md={6}>
          <h2>Contact Us</h2>
            <h3>Address</h3>
            <p><strong>Address:</strong> Kharghar, Navi Mumbai</p>
            <p><strong>Email:</strong> support@leave-management.com</p>
            <p><strong>Phone:</strong> +91 123 456 7890</p>
            <h5>Send Us Your Feedback</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="light" className="mt-2">
                Send Feedback
              </Button>
            </Form>
          </Col>
          <Col md={6}>
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.859782122735!2d73.05424620000001!3d19.0258994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c24cce39457b%3A0x8bd69eab297890b0!2sCentre%20for%20Development%20of%20Advanced%20Computing%20(CDAC)!5e0!3m2!1sen!2sin!4v1746963103281!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Col>
        </Row>

        <h4 className="mt-4">Follow Us:</h4>
        <ListGroup horizontal>
          <ListGroup.Item>
            <Button variant="link" href="https://facebook.com" target="_blank">Facebook</Button>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button variant="link" href="https://twitter.com" target="_blank">Twitter</Button>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button variant="link" href="https://instagram.com" target="_blank">Instagram</Button>
          </ListGroup.Item>
        </ListGroup>

        {role === 'manager' && (
          <>
            <h4 className="mt-5">User Feedbacks</h4>
            {feedbacks.length === 0 ? (
              <p>No feedback available.</p>
            ) : (
              feedbacks.map((fb, i) => (
                <Card className="mb-2 bg-light text-dark" key={i}>
                  <Card.Body>
                    <Card.Title>User ID: {fb.userId}</Card.Title>
                    <Card.Text>{fb.message}</Card.Text>
                  </Card.Body>
                </Card>
              ))
            )}
          </>
        )}
      </Container>
    </div>
  );
}
