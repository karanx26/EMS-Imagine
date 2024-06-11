import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

function ReimbursementA() {
  const [reimbursements, setReimbursements] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/reimbursements')
      .then(response => {
        setReimbursements(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the reimbursements!", error);
      });
  }, []);

  const handleUpdateStatus = (id, status) => {
    axios.patch(`http://localhost:8001/reimbursements/${id}`, { status })
      .then(response => {
        setReimbursements(prevState =>
          prevState.map(reimbursement =>
            reimbursement._id === id ? response.data : reimbursement
          )
        );
      })
      .catch(error => {
        console.error("There was an error updating the status!", error);
      });
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
              <th style={thStyles}>UID</th>
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
                <td style={tdStyles}>{reimbursement.uid}</td>
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
                  {reimbursement.status === "Pending" && (
                    <>
                      <button
                        className="btn btn-sm btn-success mb-2"
                        onClick={() => handleUpdateStatus(reimbursement._id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleUpdateStatus(reimbursement._id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ReimbursementA;
