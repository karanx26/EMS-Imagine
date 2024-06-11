import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const LeaveA = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:8001/leaves");
        setLeaves(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://localhost:8001/leaves/${id}/status`, { status });
      // Update the state to reflect the status change
      setLeaves(leaves.map(leave => leave._id === id ? { ...leave, status } : leave));
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const tableContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  };

  const tableStyle = {
    fontSize: "0.875rem",
    width: '80%',
    borderCollapse: 'collapse',
  };

  const thStyles = {
    border: '1px solid #ddd',
    padding: '10px',
    backgroundColor: '#f2f2f2',
    textAlign: 'center'
  };

  const tdStyles = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center'
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">LEAVE APPLICATIONS</h2>
      <div style={tableContainerStyle}>
      <table className="table table-bordered" style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyles}>UID</th>
            <th style={thStyles}>Name</th>
            <th style={thStyles}>Leave Type</th>
            <th style={thStyles}>Start Date</th>
            <th style={thStyles}>End Date</th>
            <th style={thStyles}>Reason</th>
            <th style={thStyles}>Status</th> 
            <th style={thStyles}>Actions</th> 
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td style={tdStyles}>{leave.uid}</td>
              <td style={tdStyles}>{leave.name}</td>
              <td style={tdStyles}>{leave.leaveType}</td>
              <td style={tdStyles}>{leave.startDate}</td>
              <td style={tdStyles}>{leave.endDate}</td>
              <td style={tdStyles}>{leave.reason}</td>
              <td style={tdStyles}>{leave.status}</td>
              <td style={tdStyles}>
                <button className="btn btn-sm btn-success me-2" onClick={() => handleStatusChange(leave._id, "Approved")}>
                  Approve
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleStatusChange(leave._id, "Rejected")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default LeaveA;
