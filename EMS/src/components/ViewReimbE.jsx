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

  return (
    <div className="container mt-5">
      <h1>View Reimbursement Applications</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Expense Type</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Expense</th>
            <th>Uploaded Proofs</th>
            <th>Status</th>
            
          </tr>
        </thead>
        <tbody>
          {reimbursements.map((reimbursement) => (
            <tr key={reimbursement._id}>
              <td>{reimbursement.expenseType}</td>
              <td>{reimbursement.description}</td>
              <td>{new Date(reimbursement.startDate).toLocaleDateString()}</td>
              <td>{new Date(reimbursement.endDate).toLocaleDateString()}</td>
              <td>{reimbursement.totalExpense}</td>
              
              <td>
                {reimbursement.proofs ? (
                  <a href={`http://localhost:8001/${reimbursement.proofs}`} target="_blank" rel="noopener noreferrer">
                    View Proof
                  </a>
                ) : (
                  "No Proof Uploaded"
                )}
              </td>
              <td>{reimbursement.status || "Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewReimbE;
