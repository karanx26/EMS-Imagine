import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ProfileA.css";

function ProfileA() {
  const [loginData, setLoginData] = useState([]);
  const [adminData, setAdminData] = useState({
    uid: "",
    password: "",
  });

  useEffect(() => {
    const fetchAllRecord = async () => {
      try {
        const res = await axios.get("http://localhost:8001/admins");
        setLoginData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllRecord();
  }, []);

  useEffect(() => {
    const uid = window.localStorage.getItem("uid");
    const admin = loginData.find((item) => item.uid === uid);
    if (admin) {
      setAdminData(admin);
    }
  }, [loginData]);

  localStorage.removeItem("isLoggedIn");
  window.localStorage.removeItem("isLoggedIn");

  return (
    <>
      <div className="containerpa mt-5">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="cardpa">
              <div className="cardpa-header text-center">
                <h2 className="text-white">PROFILE</h2>
              </div>
              <div className="cardpa-body">
                <form>
                  <div className="form-group-pa mb-3">
                    <label>
                      <b>Unique Id: </b> {adminData.uid}
                    </label>
                    <br />
                    <label>
                      <b>Password: </b> {adminData.password}
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileA;
