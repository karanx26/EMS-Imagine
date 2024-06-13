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
      <h2>Manage Clients</h2>
    </>
  );
}

export default ManageClientE;
