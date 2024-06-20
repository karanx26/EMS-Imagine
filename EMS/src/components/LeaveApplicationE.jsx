import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/LeaveApp.css';

function LeaveApplicationE() {
  const [leaves, setLeaves] = useState([]);
  const [timePeriodFilter, setTimePeriodFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("All");
  const userId = localStorage.getItem("uid"); // Assuming you store the user ID in local storage

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/leaves/${userId}`);
        setLeaves(response.data);
      } catch (error) {
        console.error("Error fetching leave applications:", error);
      }
    };

    fetchLeaves();
  }, [userId]);

  const handleTimePeriodFilterChange = (event) => {
    setTimePeriodFilter(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handlePaymentTypeFilterChange = (event) => {
    setPaymentTypeFilter(event.target.value);
  };

  const handleClearFilters = () => {
    setTimePeriodFilter("All");
    setStatusFilter("All");
    setPaymentTypeFilter("All");
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
    return true;
  });

  return (
    <div className="container">
      <h2 className="heading">LEAVE APPLICATIONS</h2>

      <div className="filters">
        <div className="filter-group">
          <label className="filter-label">Time Period:</label>
          <select className="form-select" value={timePeriodFilter} onChange={handleTimePeriodFilterChange}>
            <option value="All">All Time</option>
            <option value="Last Month">Last Month</option>
            <option value="Last Year">Last Year</option>
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Status:</label>
          <select className="form-select" value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="All">All</option>
            {/* <option value="Pending">Pending</option> */}
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Leave Payment Type:</label>
          <select className="form-select" value={paymentTypeFilter} onChange={handlePaymentTypeFilterChange}>
            <option value="All">All</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>
        <div className="filter-group">
          <button className="btn btn-secondary" onClick={handleClearFilters}>Clear All Filters</button>
        </div>
      </div>

      {filteredLeaves.length > 0 ? (
        <table className="leave-table">
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Days</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Leave Payment Type</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.leaveType}</td>
                <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                <td>{leave.totalDays}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
                <td>{leave.leavePaymentType}</td>
                <td>{leave.review}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center"><br />No leave applications found.</p>
      )}
    </div>
  );
}

export default LeaveApplicationE;
