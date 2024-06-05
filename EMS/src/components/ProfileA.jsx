import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios"; // Import your custom CSS

function ProfileA() {
  const [loginData, setLoginData] = useState([])

    var adminData = {
        uid: "",
        password: "",
        // Email: "",
        // RollNumber: "",
        // Department: "",
        // Address: "",
        // City: "",
        // Semester: "",
        // CGPA: ""
    }
    // const userName = window.localStorage.getItem("userName")
    useEffect(()=>{
        const fetchAllRecord = async () => {
          try{
            const res = await axios.get("http://localhost:8001/admins")
            setLoginData(res.data)
            console.log(loginData)
            console.log(res.data)
          }
          catch(err){
            console.log(err)
          }
        };
        fetchAllRecord();
      },[])
      for (var i=0; i<loginData.length; i++){
        if (loginData[i]["uid"] == window.localStorage.getItem("uid")) {
            adminData = loginData[i]
        }
      }
      const [formData, setFormData] = useState(
        {
            uid: adminData["uid"],
            // email: adminData["email"],
            password: adminData["password"],
            
        });
    
    return (
        <div id="adminP-container">
            <div id="adminP">
                <h1>Profile</h1>
                <div className="form">
                    <label>Unique Id: </label><input type="text" placeholder={"uid"} value={adminData["uid"]} />
                    <label>Password: </label><input type="text" placeholder={"password"} value={adminData["password"]} />
                    
                    {/* <label>Password: </label><input type="text" placeholder={"password"} value={adminData["password"]} onChange={(e) =>adminData["password"] = e.target.value}/> */}
                    
                </div>
            </div>
        </div>
    )};

export default ProfileA;
