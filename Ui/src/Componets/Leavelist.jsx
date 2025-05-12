import React, { useEffect, useState } from 'react';
import { Container, Table, Alert, Button, Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Leavelist({ userId, role }) {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    const url =
      role === 'manager'
        ? 'http://localhost:7800/leaves' // manager gets all
        : `http://localhost:7800/leaves/${userId}`; // staff gets their own
    try {
      const res = await fetch(url);
      const data = await res.json();
      setLeaves(data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to load leave data.');
      console.log(err);
      setLoading(false);
    }
  };

  const handleAction = async (leaveId, action) => {
    try {
      const res = await fetch(`http://localhost:7800/leaves/${action}/${leaveId}`, {
        method: 'PUT',
      });
      if (!res.ok) throw new Error();
      toast.success(`Leave ${action}d.`);
      fetchLeaves(); // Refresh data
    } catch {
      toast.error(`Failed to ${action} leave.`);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [userId, role]);

  return (
    <Container className="mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <Alert variant="info">
        <h2>{role === 'manager' ? 'All Leave Requests' : 'My Leave Applications'}</h2>
      </Alert>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Days</th>
              <th>Reason</th>
              <th>Status</th>
              {role === 'manager' && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.userId}</td>
                <td>{leave.type}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>
                  {Math.ceil(
                    (new Date(leave.endDate) - new Date(leave.startDate)) /
                      (1000 * 60 * 60 * 24)
                  ) + 1}
                </td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
                {role === 'manager' && (
                  <td>
                    {leave.status === 'Pending' ? (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={() => handleAction(leave._id, 'approve')}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleAction(leave._id, 'reject')}
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      '--'
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
