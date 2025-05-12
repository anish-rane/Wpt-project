import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ManageEmployees({ role }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'manager') {
      navigate('/unauthorized'); // or return early if no redirect
    } else {
      fetchEmployees();
    }
  }, [role]);

  const fetchEmployees = async () => {
    try {
      const res = await fetch('http://localhost:7800/users');
      const data = await res.json();
      setEmployees(data);
    } catch {
      setError('Failed to fetch employees.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="mt-4">
      <Alert variant="secondary">
        <h2>Manage Employees</h2>
      </Alert>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            {/* Add Edit/Delete headers if needed */}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp._id}>
              <td>{index + 1}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
              {/* Add buttons here if update/delete needed */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
