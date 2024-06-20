import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const LeaveA = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = window.localStorage.getItem("uid");

  // Set initial filter based on the user role
  const initialFilter = currentUser === "A002" ? "Second Level Pending" : currentUser === "A001" ? "Pending" : "All";
  const [statusFilter, setStatusFilter] = useState(initialFilter);
  const [timePeriodFilter, setTimePeriodFilter] = useState("All");
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("All");
  const [employeeFilter, setEmployeeFilter] = useState("All");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:8001/leaves");
        setLeaves(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleTimePeriodFilterChange = (event) => {
    setTimePeriodFilter(event.target.value);
  };

  const handlePaymentTypeFilterChange = (event) => {
    setPaymentTypeFilter(event.target.value);
  };

  const handleEmployeeFilterChange = (event) => {
    setEmployeeFilter(event.target.value);
  };

  const handleClearFilters = () => {
    setStatusFilter("All");
    setTimePeriodFilter("All");
    setPaymentTypeFilter("All");
    setEmployeeFilter("All");
  };

  const filterByTimePeriod = (leave) => {
    const currentDate = new Date();
    const leaveDate = new Date(leave.startDate);
    if (timePeriodFilter === "Last Month") {
      const lastMonth = new Date();
      lastMonth.setMonth(currentDate.getMonth() - 1);
      return leaveDate >= lastMonth;
    } else if (timePeriodFilter === "Last Year") {
      const lastYear = new Date();
      lastYear.setFullYear(currentDate.getFullYear() - 1);
      return leaveDate >= lastYear;
    }
    return true;
  };

  const filteredLeaves = leaves.filter(leave => {
    if (!filterByTimePeriod(leave)) return false;
    if (statusFilter !== "All" && statusFilter !== leave.status) return false;
    if (paymentTypeFilter !== "All" && paymentTypeFilter !== leave.leavePaymentType) return false;
    if (employeeFilter !== "All" && employeeFilter !== leave.name) return false;
    return true;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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

  const uniqueEmployees = [...new Set(leaves.map(leave => leave.name))];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">LEAVE APPLICATIONS</h2>
      <div className="mb-4 text-center">
        <div className="mb-2">
          <label className="me-2">Time Period:</label>
          <select className="form-select w-auto d-inline-block" value={timePeriodFilter} onChange={handleTimePeriodFilterChange}>
            <option value="All">All Time</option>
            <option value="Last Month">Last Month</option>
            <option value="Last Year">Last Year</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="me-2">Status:</label>
          <select className="form-select w-auto d-inline-block" value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Second Level Pending">Second Level Pending</option>
            <option value="All">All</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="me-2">Leave Payment Type:</label>
          <select className="form-select w-auto d-inline-block" value={paymentTypeFilter} onChange={handlePaymentTypeFilterChange}>
            <option value="All">All Payment Types</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="me-2">Employee:</label>
          <select className="form-select w-auto d-inline-block" value={employeeFilter} onChange={handleEmployeeFilterChange}>
            <option value="All">All Employees</option>
            {uniqueEmployees.map((employee, index) => (
              <option key={index} value={employee}>{employee}</option>
            ))}
          </select>
        </div>
        <div className="mt-3">
          <button className="btn btn-secondary" onClick={handleClearFilters}>Clear All Filters</button>
        </div>
      </div>
      <div style={tableContainerStyle}>
        {filteredLeaves.length > 0 ? (
          <table className="table table-bordered" style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyles}>Name</th>
                <th style={thStyles}>Leave Type</th>
                <th style={thStyles}>Start Date</th>
                <th style={thStyles}>End Date</th>
                <th style={thStyles}>Total Days</th>
                <th style={thStyles}>Status</th>
                <th style={thStyles}>Leave Payment Type</th>
                <th style={thStyles}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.map((leave) => (
                <tr key={leave._id}>
                  <td style={tdStyles}>{leave.name}</td>
                  <td style={tdStyles}>{leave.leaveType}</td>
                  <td style={tdStyles}>{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td style={tdStyles}>{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td style={tdStyles}>{leave.totalDays}</td>
                  <td style={tdStyles}>{leave.status}</td>
                  <td style={tdStyles}>{leave.leavePaymentType}</td>
                  <td style={tdStyles}>
                    <Link to={`/homea/checkleave/${leave._id}`} className="btn btn-primary btn-sm">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No leave applications found.</div>
        )}
      </div>
    </div>
  );
};

export default LeaveA;
