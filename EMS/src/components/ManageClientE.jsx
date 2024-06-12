import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/ManageClient.css"; // Import custom CSS for styling

function ManageClientE() {

  const [employee, setEmployee] = useState([]);

  const navigate = useNavigate();

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
      <div id="manage-client-container">
        <div className="button-container">
          <Link to="/homea/addempa" className="manage-button">
            <i className="bi bi-person-plus-fill"></i>
            Add Employees
          </Link>
        {/* </div>
        <div className="px-5 mt-3">
          <div className="card mt-3">
            <div className="card-header text-center">
              <h2>EMPLOYEE LIST</h2>
            </div>
            <div className="card-body">
              <table className="table table-striped custom-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Uid</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Department</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employee.map((e, index) => (
                    <tr key={e.uid}>
                      <td>{index + 1}</td>
                      <td>{e.uid}</td>
                      <td>{e.name}</td>
                      <td>{e.phone}</td>
                      <td>{e.department}</td>
                      <td>
                        <Link to={`/homea/editempa/${e.uid}`} className="btn btn-primary btn-sm">Edit</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>*/}
         </div> 
      </div>
    </>
  );
}

export default ManageClientE;
