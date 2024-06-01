import "../styles/Login.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginformA() {
  const [lformData, setFormData] = useState({
    uid: "",
    password: "",
  });
  const [loginData, setLoginData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:8001/admins");
        setLoginData(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllAdmin();
  }, []);

  const validate = (lformData, loginData) => {
    if (!lformData.uid) {
      alert("User ID is required");
      return;
    }
    const user = loginData.find(user => user.uid === lformData.uid);
    if (!user) {
      alert("Invalid User ID");
      return;
    }
    if (!lformData.password) {
      alert("Password is required");
      return;
    }
    if (lformData.password !== user.password) {
      alert("Wrong Password");
      return;
    }
    window.localStorage.setItem("isLoggedIn", true);
    window.localStorage.setItem("uid", lformData.uid);
    navigate("/homea");
  };

  return (
    <>
      <div id="header">
        <nav>
          <div id="logo-img">
            <img src="../Images/mainlogo.png" alt="logo" />
          </div>
          <ul>
            <li>
              <a href="/login">BACK</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
        <div className="p-3 rounded w-25 border loginForm">
          <form onSubmit={(e) => {
            e.preventDefault();
            validate(lformData, loginData);
          }}>
            <h2 className="center-align">Admin</h2>
            <div className="mb-3">
              <label htmlFor="uid">
                <strong>Unique Id</strong>
              </label>
              <br />
              <input
                type="text"
                autoComplete="off"
                placeholder="Enter UID"
                name="uid"
                className="form-control"
                id="uid"
                value={lformData.uid} 
                onChange={(e) => setFormData({ ...lformData, uid: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <br />
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="form-control"
                id="password"
                value={lformData.password} 
                onChange={(e) => setFormData({ ...lformData, password: e.target.value })}
              />
            </div>
            <button 
              type="submit"
              className="btn btn-primary w-100 rounded-0 mb-2"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginformA;

