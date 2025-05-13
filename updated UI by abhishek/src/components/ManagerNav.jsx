// src/Components/ManagerNav.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ManagerNav() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Leave Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/apply-leave">Apply Leave</Nav.Link>
            <Nav.Link as={Link} to="/leaves">Leave Requests</Nav.Link>
            <Nav.Link as={Link} to="/manage-leaves">Manage Leaves</Nav.Link>
            <Nav.Link as={Link} to="/manage-employees">Manage Employees</Nav.Link>
            <Nav.Link as={Link} to="/about-us">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact-us">Contact Us</Nav.Link>
            <Nav.Link as={Link} to="/login">Logout</Nav.Link> {/* Logout Button */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
