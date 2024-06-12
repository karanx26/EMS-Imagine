import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/ManageClient.css"; // Import custom CSS for styling

function ManageClientA() {

  

  const navigate = useNavigate();


  useEffect(() => {
    localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("isLoggedIn");
  }, []);

  return (
    <>
      <div id="manage-client-container">
        <div className="button-container">
          <Link to="/homea/addclienta" className="manage-button">
            <i className="bi bi-person-plus-fill"></i>
            Add Clients
          </Link>
       
         </div> 
      </div>
    </>
  );
}

export default ManageClientA;
