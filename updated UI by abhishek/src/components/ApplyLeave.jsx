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
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      toast.success('Leave application submitted successfully!');
      setFormData({ type: '', startDate: '', endDate: '', reason: '' });
    } catch (err) {
      toast.error('Failed to submit leave application.');
      console.log(err);
    }
  };

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
        src="\src\assets\applyleave_bg.jpg" // ✅ Replace with your actual background image in public/assets
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
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          padding: '3rem 2rem',
          borderRadius: '12px',
          marginTop: '2rem',
          color: 'white',
          maxWidth: '600px',
        }}
      >
        <ToastContainer position="top-right" autoClose={3000} />
        <Alert variant="info" className="text-center" style={{ backgroundColor: '#0dcaf0', color: '#000' }}>
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

          <Form.Group className="mb-4">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              as="textarea"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Mention your reason here..."
              rows={3}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Submit Application
          </Button>
        </Form>
      </Container>
    </div>
  );
}
