import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewReimbE() {
  const [reimbursements, setReimbursements] = useState([]);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    const fetchReimbursements = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/reimbursement/${uid}`);
        setReimbursements(response.data);
      } catch (error) {
        console.error("Error fetching reimbursements:", error);
      }
    };

    if (uid) {
      fetchReimbursements();
    }
  }, [uid]);

  const deleteReimbursement = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/reimbursement/${id}`);
      setReimbursements(reimbursements.filter((reimbursement) => reimbursement._id !== id));
    } catch (error) {
      console.error("Error deleting reimbursement:", error);
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
  <>
  <br/>
    <br/>
    
      <h2 className="text-center">REIMBURSEMENT APPLICATIONS</h2>
      <div style={tableContainerStyle}>
      <table className="table table-bordered" style={tableStyle}>
      
        <thead>
          <tr>
            <th style={thStyles}>Expense Type</th>
            <th style={thStyles}>Vehicle Type</th>
            <th style={thStyles}>Total Kms</th>
            <th style={thStyles}>Description</th>
            <th style={thStyles}>Start Date</th>
            <th style={thStyles}>End Date</th>
            <th style={thStyles}>Total Expense</th>
            <th style={thStyles}>Uploaded Proofs</th>
            <th style={thStyles}>Status</th>
            <th style={thStyles}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reimbursements.map((reimbursement) => (
            <tr key={reimbursement._id}>
              <td style={tdStyles}>{reimbursement.expenseType}</td>
              <td style={tdStyles}>{reimbursement.vehicleType || '-'}</td>
              <td style={tdStyles}>{reimbursement.totalKms || '-'}</td>
              <td style={tdStyles}>{reimbursement.description}</td>
              <td style={tdStyles}>{new Date(reimbursement.startDate).toLocaleDateString()}</td>
              <td style={tdStyles}>{new Date(reimbursement.endDate).toLocaleDateString()}</td>
              <td style={tdStyles}>{reimbursement.totalExpense}</td>
              <td style={tdStyles}>
                {reimbursement.proofs && reimbursement.proofs.length > 0 ? (
                  reimbursement.proofs.map((proof, index) => (
                    <div key={index}>
                      <a href={`http://localhost:8001/${proof}`} target="_blank" rel="noopener noreferrer">
                        View Proof {index + 1}
                      </a>
                    </div>
                  ))
                ) : (
                  "No Proof Uploaded"
                )}
              </td>
              <td style={tdStyles}>{reimbursement.status}</td>
              <td style={tdStyles}>
                <button className="btn btn-sm btn-danger" onClick={() => deleteReimbursement(reimbursement._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  </>
  );
}

export default ViewReimbE;
