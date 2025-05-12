import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ApplyLeave() {
  const [formData, setFormData] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:7800/leaves/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        'Authorization': `Bearer ${token}`,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.log(response)
        throw new Error('Failed to submit');
      }

      toast.success('Leave application submitted successfully!');
      setFormData({ type: '', startDate: '', endDate: '' });
    } catch (err) {
      toast.error('Failed to submit leave application.');
      console.log(err);
    }
  };

  return (
    <Container className="mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <Alert variant="info">
        <h2>Apply for Leave</h2>
      </Alert>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Leave Type</Form.Label>
          <Form.Select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">-- Select Leave Type --</option>
            <option>Medical</option>
            <option>Casual</option>
            <option>Paid</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>From Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>To Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Application
        </Button>
      </Form>
    </Container>
  );
}
