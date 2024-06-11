import React, { useEffect, useState } from "react";
import axios from "axios";

function LeaveApplicationE() {
  const [leaves, setLeaves] = useState([]);
  const userId = localStorage.getItem("uid"); // Assuming you store the user ID in local storage

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/leaves/${userId}`);
        setLeaves(response.data);
      } catch (error) {
        console.error("Error fetching leave applications:", error);
      }
    };

    fetchLeaves();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/leaves/${id}`);
      // Update the state to remove the deleted leave application
      setLeaves(leaves.filter(leave => leave._id !== id));
    } catch (error) {
      console.error("Error deleting leave application:", error);
    }
  };

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
    <div>
    <br/>
    <br/>
      <h2 className="text-center">LEAVE APPLICATIONS</h2>
      <div style={tableContainerStyle}>
      {leaves.length > 0 ? (
        <table className="table table-bordered" style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyles}>Leave Type</th>
              <th style={thStyles}>Start Date</th>
              <th style={thStyles}>End Date</th>
              <th style={thStyles}>Reason</th>
              <th style={thStyles}>Status</th>
              <th style={thStyles}>Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td style={tdStyles}>{leave.leaveType}</td>
                <td style={tdStyles}>{leave.startDate}</td>
                <td style={tdStyles}>{leave.endDate}</td>
                <td style={tdStyles}>{leave.reason}</td>
                <td style={tdStyles}>{leave.status}</td>
                <td style={tdStyles}>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(leave._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leave applications found.</p>
      )}
    </div>
    </div>
  );
}

export default LeaveApplicationE;
