import React, { useEffect, useState } from "react";
import axios from "axios";

function ProfileE() {
  const [loginData, setLoginData] = useState([]);
  const [employeeData, setemployeeData] = useState({
    uid: "",
    password: "",
    name: "",
    phone: "",
    email: "",
    department: "",
    dob: "",
    joiningDate: "",
    address: ""
  });

  useEffect(() => {
    const fetchAllRecord = async () => {
      try {
        const res = await axios.get("http://localhost:8001/employees");
        setLoginData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllRecord();
  }, []);

  useEffect(() => {
    const uid = window.localStorage.getItem("uid");
    const employee = loginData.find((item) => item.uid === uid);
    if (employee) {
      setemployeeData(employee);
    }
  }, [loginData]);

  localStorage.removeItem("isLoggedIn");
  window.localStorage.removeItem("isLoggedIn");

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="card">
              <div className="card-header text-center">
                <h2>PROFILE</h2>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group mb-3">
                    <label><b>Unique Id : </b> {employeeData.uid}</label>
                    <br />
                    <br />
                    <label><b>Name : </b> {employeeData.name}</label>
                    <br />
                    <br />
                    <label><b>Phone no : </b> {employeeData.phone}</label>
                    <br />
                    <br />
                    <label><b>Email : </b> {employeeData.email}</label>
                    <br />
                    <br />
                    <label><b>Department : </b> {employeeData.department}</label>
                    <br />
                    <br />
                    <label><b>Date of Birth : </b> {employeeData.dob}</label>
                    <br />
                    <br />
                    <label><b>Joining Date : </b> {employeeData.joiningDate}</label>
                    <br />
                    <br />
                    <label><b>Address : </b> {employeeData.address}</label>
                    <br />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};

export default ProfileE;
