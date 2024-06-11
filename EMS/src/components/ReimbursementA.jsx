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

  return (
    <>
      <h1>Reimbursement Applications</h1>
      <table className="table table-borderd">
        <thead>
          <tr>
            <th>UID</th>
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
              <td>{reimbursement.uid}</td>
              <td>{reimbursement.expenseType}</td>
              <td>{reimbursement.description}</td>
              <td>{new Date(reimbursement.startDate).toLocaleDateString()}</td>
              <td>{new Date(reimbursement.endDate).toLocaleDateString()}</td>
              
              <td>{reimbursement.totalExpense}</td>
              <td>
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
              <td>{reimbursement.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ReimbursementA;
