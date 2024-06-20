import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CheckReimb = () => {
  const { id } = useParams();
  const [reimbursement, setReimbursement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState(""); // New state for review
  const navigate = useNavigate();

  const adminId = window.localStorage.getItem("uid");

  useEffect(() => {
    const fetchReimbursement = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/reimbursements/${id}`);
        setReimbursement(response.data);
      } catch (error) {
        setError("Error fetching reimbursement application");
        console.error("Error fetching reimbursement application:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReimbursement();
  }, [id]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://localhost:8001/reimbursements/${id}/status`, { status, review }); // Include review
      setReimbursement((prevReimbursement) => ({
        ...prevReimbursement,
        status,
      }));
      navigate("/homea/reimba");
    } catch (error) {
      console.error("Error updating reimbursement status:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this reimbursement application?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8001/reimbursements/${id}`);
        navigate("/homea/reimba");
      } catch (error) {
        console.error("Error deleting reimbursement:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!reimbursement) {
    return <div>Reimbursement application not found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-orange text-white">
          <h2>APPLICATION DETAILS</h2>
        </div>
        <div className="card-body">
          <p><strong>Employee UID:</strong> {reimbursement.uid}</p>
          <p><strong>Expense Type:</strong> {reimbursement.expenseType}</p>
          <p><strong>Vehicle Type:</strong> {reimbursement.vehicleType || '-'}</p>
          <p><strong>Total Kms:</strong> {reimbursement.totalKms || '-'}</p>
          <p><strong>Description:</strong> {reimbursement.description}</p>
          <p><strong>Start Date:</strong> {new Date(reimbursement.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(reimbursement.endDate).toLocaleDateString()}</p>
          <p><strong>GST Type:</strong> {reimbursement.gstType}</p>
          <p><strong>Status:</strong> {reimbursement.status}</p>
          <p><strong>Total Expense:</strong> {reimbursement.totalExpense}</p>
          <div>
            <strong>Proofs:</strong>
            <ul>
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
            </ul>
          </div>
          <p><strong>Review:</strong> {reimbursement.review}</p>
          <div>
            
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Add your review here"
              rows="4"
              cols="50"
            />
          </div>
        </div>
        <div>
          {(reimbursement.status === "Pending" || reimbursement.status === "On Hold by Admin 1") && adminId === "A001"  && (
            <>
              <button
                className="btn btn-sm btn-warning mb-2"
                onClick={() => handleStatusChange(reimbursement._id, "Second Level Pending")}
              >
                Send for Approval
              </button>
              <button
                className="btn btn-sm btn-danger mb-2"
                onClick={() => handleStatusChange(reimbursement._id, "Rejected")}
              >
                Reject
              </button>
              <button
                className="btn btn-sm btn-secondary mb-2"
                onClick={() => handleStatusChange(reimbursement._id, "On Hold by Admin 1")}
              >
                On Hold
              </button>
            </>
          )}
          {(reimbursement.status === "Second Level Pending" || reimbursement.status === "On Hold by Admin 2") && adminId === "A002"  && (
            <>
              <button
                className="btn btn-sm btn-warning mb-2"
                onClick={() => handleStatusChange(reimbursement._id, "Third Level Pending")}
              >
                Send for Approval
              </button>
              <button
                className="btn btn-sm btn-danger mb-2"
                onClick={() => handleStatusChange(reimbursement._id, "Rejected")}
              >
                Reject
              </button>
              <button
                className="btn btn-sm btn-secondary mb-2"
                onClick={() => handleStatusChange(reimbursement._id, "On Hold by Admin 2")}
              >
                On Hold
              </button>
            </>
          )}
          {(reimbursement.status === "Third Level Pending" || reimbursement.status === "On Hold by Admin 3") && adminId === "A003"  && (
            <>
              <button
                className="btn btn-sm btn-success mb-2"
                onClick={() => handleStatusChange(reimbursement._id, "Approved")}
              >
                Approve
              </button>
              <button
                className="btn btn-sm btn-danger mb-2"
                onClick={() => handleStatusChange(reimbursement._id, "Rejected")}
              >
                Reject
              </button>
              <button
                className="btn btn-sm btn-secondary mb-2"
                onClick={() => handleStatusChange(reimbursement._id, "On Hold by Admin 3")}
              >
                On Hold
              </button>
            </>
          )}
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => handleDelete(reimbursement._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckReimb;
