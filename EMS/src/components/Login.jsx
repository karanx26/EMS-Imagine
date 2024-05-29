import React from "react";

import '../styles/Login.css';

const Login = () => {
  return (
    <>
    <div id="header">
        <nav>
          <div id="logo-img">
            <img src="../Images/mainlogo.png" alt="logo" />
          </div>
          <ul>
            <li>
              <a href="/">Back</a>
            </li>
          </ul>
        </nav>
      </div>
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
        <div className="p-3 rounded w-25 border loginForm">
        <h2 className="center-align">LogIn As</h2>
            <div className="d-flex justify-content-between mt-5 mb-2">
                <button type="button" className="btn btn-primary">Admin</button>
                <button type="button" className="btn btn-danger">Employee</button>
                <button type="button" className="btn btn-success">Client</button>
            </div>
        </div>      
    </div>
    </>
  );
}

export default Login;