import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/ManageEmpA.css"; // Import custom CSS for styling

function ManageEmpA() {

  const [employee, setEmployee] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllRecord = async () => {
      try {
        const res = await axios.get("http://localhost:8001/employees");
        setEmployee(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllRecord();
  }, []);

  useEffect(() => {
    localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("isLoggedIn");
  }, []);

  return (
    <>
    <div id="manage-emp-container">
      <div className="button-container">
        <Link to="/assign-task" className="manage-button">
          <i className="bi bi-list-task"></i>
          Task Assignment
        </Link>
        <Link to="/homea/attendancea" className="manage-button">
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
        <Link to="/homea/addempa" className="manage-button">
          <i className="bi bi-person-plus-fill"></i>
          Add Employees
        </Link>
      </div>
    </div>
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Uid</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Department</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr>
                <td>{e.uid}</td>
                <td>{e.name}</td>
                <td>{e.phone}</td>
                <td>{e.email}</td>
                <td>{e.department}</td>
                <td>{e.salary}</td>
              
                
                {/* <td>
                  <Link
                    // to={`/dashboard/edit_employee/` + e.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    // onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default ManageEmpA;
