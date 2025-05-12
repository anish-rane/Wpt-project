// src/Components/Login.js
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ setRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:7800/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        
        setRole(data.role); 
        console.log(data.role)
        toast.success('Login successful');
        window.location.href = '/home';  
        localStorage.setItem('token', data.token);
        console.log('Role:', data.role);
       
        
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      toast.error('Failed to connect to the server');
    }
  };

  return (
    <Container className="mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2>Login</h2>
      <Form>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </Container>
  );
}
