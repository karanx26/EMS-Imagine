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
            <th>Actions</th>
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
              <td>{reimbursement.status || "Pending"}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => deleteReimbursement(reimbursement._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewReimbE;
