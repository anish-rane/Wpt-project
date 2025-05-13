// src/Components/ManageLeaves.js
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';

export default function ManageLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState('');

  // Fetch leave data for all employees (for manager)
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await fetch('http://localhost:7800/leaves');
        if (!response.ok) {
          throw new Error('Error fetching leaves');
        }
        const data = await response.json();
        setLeaves(data);
      } catch (err) {
        setError('Error fetching leaves');
      }
    };
    fetchLeaves();
  }, []);

  const handleApprove = async (leaveId) => {
    try {
      const response = await fetch(`http://localhost:7800/leaves/approve/${leaveId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Error approving leave');
      }
      const updatedLeave = await response.json();
      setLeaves(leaves.map(leave => leave._id === leaveId ? { ...leave, status: 'approved' } : leave));
    } catch (err) {
      setError('Error approving leave');
    }
  };

  const handleReject = async (leaveId) => {
    try {
      const response = await fetch(`http://localhost:7800/leaves/reject/${leaveId}`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Error rejecting leave');
      }
      const updatedLeave = await response.json();
      setLeaves(leaves.map(leave => leave._id === leaveId ? { ...leave, status: 'rejected' } : leave));
    } catch (err) {
      setError('Error rejecting leave');
    }
  };

  return (
    <div>
      <h2>Manage Leave Requests</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Leave Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(leave => (
            <tr key={leave._id}>
              <td>{leave.name}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.status}</td>
              <td>
                {leave.status === 'pending' && (
                  <>
                    <Button variant="success" onClick={() => handleApprove(leave._id)}>Approve</Button>{' '}
                    <Button variant="danger" onClick={() => handleReject(leave._id)}>Reject</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
