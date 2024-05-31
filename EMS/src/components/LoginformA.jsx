import "../styles/Login.css";
import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function LoginformA() {
  const history = useNavigate();

  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/loginforma", {
          uid,
          password,
        })

        .then((res) => {
          if (res.data == "exist") {
            history("/homea", { state: { id: uid } });
          } else if (res.data == "notexist") {
            alert("Invalid user id.");
          }
        })

        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

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
          <form action="POST">
            <h2 className="center-align">Admin</h2>
            <div className="mb-3">
              <label htmlFor="uid">
                <strong>Unique Id</strong>
              </label>
              <br />
              <input
                type="text"
                onChange={(e) => {
                  setUid(e.target.value);
                }}
                autoComplete="off"
                placeholder="Enter UID"
                name="uid"
                className="form-control"
                id="uid"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <br />
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter Password"
                name="password"
                className="form-control"
                id="password"
              />
            </div>

            <button
              onClick={submit}
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
