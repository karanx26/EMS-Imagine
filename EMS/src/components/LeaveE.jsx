import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const LeaveE = () => {
  const [formData, setFormData] = useState({
    name: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleChange = (e) => {
    const {uid, name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [uid]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form data submitted:', formData);
  };

  localStorage.removeItem("isLoggedIn");
  window.localStorage.removeItem("isLoggedIn");

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center">
              <h2>Leave Application Form</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                  <label htmlFor="uid">Employee Unique Id:</label>
                  <input
                    type="text"
                    id="uid"
                    name="uid"
                    value={formData.uid}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="name">Employee Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="leaveType">Leave Type:</label>
                  <select
                    id="leaveType"
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleChange}
                    required
                    className="form-control"
                  >
                    <option value="">Select Leave Type</option>
                    <option value="sick">Sick Leave</option>
                    <option value="vacation">Vacation Leave</option>
                    <option value="personal">Personal Leave</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="startDate">Start Date:</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="endDate">End Date:</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="reason">Reason for Leave:</label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveE;
