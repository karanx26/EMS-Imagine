import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";

const ReimbursementA = () => {
  const [reimbursements, setReimbursements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("Pending");

  const adminId = window.localStorage.getItem("uid");

  useEffect(() => {
    const fetchReimbursements = async () => {
      try {
        const response = await axios.get("http://localhost:8001/reimbursements");
        setReimbursements(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchReimbursements();
  }, []);

  useEffect(() => {
    if (adminId === "A001") {
      setFilter("Pending");
    } else if (adminId === "A002") {
      setFilter("Second Level Pending");
    } else if (adminId === "A003") {
      setFilter("Third Level Pending");
    }
  }, [adminId]);

  const filteredReimbursements = reimbursements.filter((reimbursement) => {
    if (filter === "All") return true;

    if (adminId === "A001" && (filter === "Pending" || filter === "On Hold by Admin 1")) {
      return reimbursement.status === "Pending" || reimbursement.status === "On Hold by Admin 1";
    }
    if (adminId === "A002" && (filter === "Second Level Pending" || filter === "On Hold by Admin 2")) {
      return reimbursement.status === "Second Level Pending" || reimbursement.status === "On Hold by Admin 2";
    }
    if (adminId === "A003" && (filter === "Third Level Pending" || filter === "On Hold by Admin 3")) {
      return reimbursement.status === "Third Level Pending" || reimbursement.status === "On Hold by Admin 3";
    }

    return reimbursement.status === filter;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const tableContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  };

  const tableStyle = {
    fontSize: "0.875rem",
    width: "80%",
    borderCollapse: "collapse",
  };

  const thStyles = {
    border: "1px solid #ddd",
    padding: "10px",
    backgroundColor: "#f2f2f2",
    textAlign: "center",
  };

  const tdStyles = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">REIMBURSEMENT APPLICATIONS</h2>
      <div className="mb-4 text-center">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filter by Status
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <button className="dropdown-item" onClick={() => setFilter("Approved")}>Approved</button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => setFilter("Rejected")}>Rejected</button>
            </li>
            {adminId === "A001" && (
              <>
                <li>
                  <button className="dropdown-item" onClick={() => setFilter("Pending")}>Pending</button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => setFilter("On Hold by Admin 1")}>On Hold by Admin 1</button>
                </li>
              </>
            )}
            {adminId === "A002" && (
              <>
                <li>
                  <button className="dropdown-item" onClick={() => setFilter("Second Level Pending")}>Second Level Pending</button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => setFilter("On Hold by Admin 2")}>On Hold by Admin 2</button>
                </li>
              </>
            )}
            {adminId === "A003" && (
              <>
                <li>
                  <button className="dropdown-item" onClick={() => setFilter("Third Level Pending")}>Third Level Pending</button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => setFilter("On Hold by Admin 3")}>On Hold by Admin 3</button>
                </li>
              </>
            )}
            <li>
              <button className="dropdown-item" onClick={() => setFilter("All")}>All</button>
            </li>
          </ul>
        </div>
      </div>
      <div style={tableContainerStyle}>
        {filteredReimbursements.length > 0 ? (
          <table className="table table-bordered" style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyles}>UID</th>
                <th style={thStyles}>Employee Name</th>
                <th style={thStyles}>Expense Type</th>
                <th style={thStyles}>Start Date</th>
                <th style={thStyles}>End Date</th>
                <th style={thStyles}>Total Expense</th>
                <th style={thStyles}>Status</th>
                <th style={thStyles}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReimbursements.map((reimbursement) => (
                <tr key={reimbursement._id}>
                  <td style={tdStyles}>{reimbursement.uid}</td>
                  <td style={tdStyles}>{reimbursement.employeeName}</td>
                  <td style={tdStyles}>{reimbursement.expenseType}</td>
                  <td style={tdStyles}>{new Date(reimbursement.startDate).toLocaleDateString()}</td>
                  <td style={tdStyles}>{new Date(reimbursement.endDate).toLocaleDateString()}</td>
                  <td style={tdStyles}>{reimbursement.totalExpense}</td>
                  <td style={tdStyles}>{reimbursement.status}</td>
                  <td style={tdStyles}>
                    <Link to={`/homea/checkreimb/${reimbursement._id}`} className="btn btn-primary btn-sm">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No reimbursement applications found.</div>
        )}
      </div>
    </div>
  );
};

export default ReimbursementA;
