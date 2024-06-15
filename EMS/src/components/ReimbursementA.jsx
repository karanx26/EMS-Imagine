import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

function ReimbursementA() {
  const [reimbursements, setReimbursements] = useState([]);
  const [filter, setFilter] = useState("Pending");

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

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8001/reimbursements/${id}`)
      .then(() => {
        setReimbursements(prevState => prevState.filter(reimbursement => reimbursement._id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the reimbursement!", error);
      });
  };

  const filteredReimbursements = reimbursements.filter(reimbursement => reimbursement.status === filter);

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
      <br />
      <br />
      <h2 className="text-center">REIMBURSEMENT APPLICATIONS</h2>
      <div className="mb-4 text-center">
        <button className="btn btn-primary me-2" onClick={() => setFilter("Pending")}>Pending</button>
        <button className="btn btn-success me-2" onClick={() => setFilter("Approved")}>Approved</button>
        <button className="btn btn-danger" onClick={() => setFilter("Rejected")}>Rejected</button>
      </div>
      <div style={tableContainerStyle}>
        {filteredReimbursements.length > 0 ? (
          <table className="table table-bordered" style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyles}>UID</th>
                <th style={thStyles}>Employee Name</th>
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
              {filteredReimbursements.map((reimbursement) => (
                <tr key={reimbursement._id}>
                  <td style={tdStyles}>{reimbursement.uid}</td>
                  <td style={tdStyles}>{reimbursement.employeeName}</td>
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
                          className="btn btn-sm btn-danger mb-2"
                          onClick={() => handleUpdateStatus(reimbursement._id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleDelete(reimbursement._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No reimbursement applications found.</div>
        )}
      </div>
    </>
  );
}

export default ReimbursementA;
