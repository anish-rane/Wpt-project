// src/Components/SignUp.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole]       = useState('staff');
  const navigate               = useNavigate();

  // If already logged in, send away
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      navigate('/'); // or navigate('/login') if you want them to re-login
    }
  }, [navigate]);

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:7800/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('Account created successfully!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(data.message || 'Signup failed');
      }
    } catch (err) {
      toast.error('Failed to connect to the server');
    }
  };

  return (
    <Container className="mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2>Create an Account</h2>
      <Form>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text" placeholder="Enter your name"
            value={name} onChange={e => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email" placeholder="Enter your email"
            value={email} onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password" placeholder="Enter your password"
            value={password} onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRole" className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={role} onChange={e => setRole(e.target.value)}
            required
          >
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={handleSignUp}>
          Sign Up
        </Button>
      </Form>

      <p className="mt-3">
        Already have an account?{' '}
        <Link to="/login">Login here</Link>
      </p>
    </Container>
  );
}
