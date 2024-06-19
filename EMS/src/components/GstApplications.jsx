import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const GstApplications = () => {
  const [reimbursements, setReimbursements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchReimbursements = async () => {
      try {
        const response = await axios.get("http://localhost:8001/reimbursements");
        setReimbursements(response.data.filter((r) => r.gstType === "GST" && r.status === "Approved"));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchReimbursements();
  }, []);

  const filteredReimbursements = reimbursements.filter((reimbursement) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const reimbursementStartDate = new Date(reimbursement.startDate);

    return (
      (startDate === "" || reimbursementStartDate >= start) &&
      (endDate === "" || reimbursementStartDate <= end)
    );
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
      <h2 className="text-center mb-4">GST APPLICATIONS</h2>
      <div className="mb-4 text-center">
        <div className="mb-2">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div style={tableContainerStyle}>
        {filteredReimbursements.length > 0 ? (
          <table className="table table-bordered" style={tableStyle}>
            <thead>
              <tr>
                {/* <th style={thStyles}>UID</th> */}
                <th style={thStyles}>Employee Name</th>
                <th style={thStyles}>Expense Type</th>
                <th style={thStyles}>Start Date</th>
                <th style={thStyles}>End Date</th>
                <th style={thStyles}>Total Expense</th>
                {/* <th style={thStyles}>Status</th> */}
                <th style={thStyles}>Proofs</th>
              </tr>
            </thead>
            <tbody>
              {filteredReimbursements.map((reimbursement) => (
                <tr key={reimbursement._id}>
                  {/* <td style={tdStyles}>{reimbursement.uid}</td> */}
                  <td style={tdStyles}>{reimbursement.employeeName}</td>
                  <td style={tdStyles}>{reimbursement.expenseType}</td>
                  <td style={tdStyles}>
                    {new Date(reimbursement.startDate).toLocaleDateString()}
                  </td>
                  <td style={tdStyles}>
                    {new Date(reimbursement.endDate).toLocaleDateString()}
                  </td>
                  <td style={tdStyles}>{reimbursement.totalExpense}</td>
                  {/* <td style={tdStyles}>{reimbursement.status}</td> */}
                  <td style={tdStyles}>
                    {reimbursement.proofs.map((proof, index) => (
                      <a
                        key={index}
                        href={`http://localhost:8001/${proof}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Proof {index + 1}<br />
                      </a>
                    ))}
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No approved GST applications found for the selected period.</div>
        )}
      </div>
    </div>
  );
};

export default GstApplications;
