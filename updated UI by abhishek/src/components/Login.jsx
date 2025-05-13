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
        toast.success('Login successful');
        window.location.href = '/home';
        localStorage.setItem('token', data.token);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      toast.error('Failed to connect to the server');
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Blurred background image */}
      <img
        src="\src\assets\login_bg.jpg" // 👈 your image path (ensure it's in public/assets/)
        alt="background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'blur(8px)', // 👈 blur effect
          zIndex: 0,
        }}
      />

      {/* Foreground form container */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container
          className="p-4 rounded text-white"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            maxWidth: '500px',
            width: '100%',
          }}
        >
          <ToastContainer position="top-right" autoClose={3000} />
          <h2 className="text-center mb-4">Login</h2>
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

            <div className="d-grid">
              <Button variant="primary" onClick={handleLogin}>
                Login
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
}
