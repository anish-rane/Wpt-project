// src/Components/NavigationBar.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Navigation({ role }) {
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
              

            {/* These are available for all users */}
            <Nav.Link as={Link} to="/about-us">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact-us">Contact Us</Nav.Link>

            {/* Show these links if the user is not logged in */}
            
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
