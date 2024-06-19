import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ViewReimbE.css"; // Import the CSS file
import { Link } from "react-router-dom";

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
    <>
      <br />
      <br />
      <h2 className="text-center">REIMBURSEMENT APPLICATIONS</h2>
      <div className="table-container">
        {reimbursements.length === 0 ? (
          <p style={{ textAlign: "center" }}>No applications found.</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Expense Type</th>
                {/* <th>Vehicle Type</th> */}
                {/* <th>Total Kms</th> */}
                {/* <th>Description</th> */}
                {/* <th>GST Type</th> */}
                <th>Start Date</th>
                <th>End Date</th>
                <th>Total Expense</th>
                {/* <th>Uploaded Proofs</th> */}
                <th>Status</th>
                <th>Reviews</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reimbursements.map((reimbursement) => (
                <tr key={reimbursement._id}>
                  <td>{reimbursement.expenseType}</td>
                  {/* <td>{reimbursement.vehicleType || "-"}</td> */}
                  {/* <td>{reimbursement.totalKms || "-"}</td> */}
                  {/* <td>{reimbursement.description}</td> */}
                  {/* <td>{reimbursement.gstType}</td> */}
                  <td>{new Date(reimbursement.startDate).toLocaleDateString()}</td>
                  <td>{new Date(reimbursement.endDate).toLocaleDateString()}</td>
                  <td>{reimbursement.totalExpense}</td>
                  {/* <td>
                    {reimbursement.proofs && reimbursement.proofs.length > 0 ? (
                      reimbursement.proofs.map((proof, index) => (
                        <div key={index}>
                          <a
                            href={`http://localhost:8001/${proof}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Proof {index + 1}
                          </a>
                        </div>
                      ))
                    ) : (
                      "No Proof Uploaded"
                    )}
                  </td> */}
                  <td>{reimbursement.status}</td>
                  <td>{reimbursement.review}</td>
                  <td>
                  <Link to={`/homee/editreimb/${reimbursement._id}`} className="btn btn-primary btn-sm">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default ViewReimbE;
