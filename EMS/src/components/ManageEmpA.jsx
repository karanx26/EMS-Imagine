import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/ManageEmpA.css"; // Import custom CSS for styling

function ManageEmpA() {
  useEffect(() => {
    localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("isLoggedIn");
  }, []);

  return (
    <div id="manage-emp-container">
      <div className="button-container">
        <Link to="/assign-task" className="manage-button">
          <i className="bi bi-list-task"></i>
          Task Assignment
        </Link>
        <Link to="/attendance" className="manage-button">
          <i className="bi bi-calendar-check-fill"></i>
          Attendance
        </Link>
        <Link to="/reimbursement" className="manage-button">
          <i className="bi bi-currency-dollar"></i>
          Reimbursement
        </Link>
        <Link to="/leave-application" className="manage-button">
          <i className="bi bi-envelope-open-fill"></i>
          Leave Application
        </Link>
        <Link to="/add-employee" className="manage-button">
          <i className="bi bi-person-plus-fill"></i>
          Add Employees
        </Link>
      </div>
    </div>
  );
}

export default ManageEmpA;
