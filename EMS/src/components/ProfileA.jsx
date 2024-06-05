import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

function ProfileA() 
{
  const [admin, setAdmin] = useState([])
    const {uid} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:8001/admin/:uid'+uid)
        .then(result => {
            setAdmin(result.data[0])
        })
        .catch(err => console.log(err))
    }, [])

  // localStorage.removeItem("isLoggedIn");
  // window.localStorage.removeItem("isLoggedIn");
  
  return(
    <>
      <h1>Profile</h1>
      <div>
        
        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
            
            <div className='d-flex align-items-center flex-column mt-5'>
                <h3>UID: {admin.uid}</h3>
                <h3>Password: {admin.password}</h3>
            </div>
        </div>
    </div>
    </>
  )
}
  


export default ProfileA;
