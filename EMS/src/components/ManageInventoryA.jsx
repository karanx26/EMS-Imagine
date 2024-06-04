import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

function ManageInventoryA() 
{
  localStorage.removeItem("isLoggedIn");
  window.localStorage.removeItem("isLoggedIn");
  return(
    <>
      <h1>Manage Inventory</h1>
    </>
  )
}
  


export default ManageInventoryA;
