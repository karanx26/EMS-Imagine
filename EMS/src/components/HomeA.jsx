import React from 'react'
// import { useLocation,useNavigate } from 'react-router-dom'
import {Link, Outlet, useNavigate } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import LoginformA from './LoginformA';


function HomeA(){ 
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const handleLogout = () => {
        // axios.get('http://localhost:5173/loginforma/logout')
        axios.get('http://localhost:8001/logout')
        .then (result => {
            if(result.data.Status){
                localStorage.removeItem("isLoggedIn")
                window.localStorage.removeItem("isLoggedIn");
                window.location.href = "/login"; // Redirect to login page
            }
        })
    }

    // const location = useLocation()

    return (
        <div className="container-fluid">
            {/* <h1> Hello{location.state.id} and Welcome to Dashboard</h1> */}
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-yellow min-vh-100">
                        <Link to="/HomeA" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-yellow text-decoration">
                        <span className="fs-5 fw-bolder d-none d-sm-inline">
                Imagine Powertree
              </span>
              </Link>

                        <ul  className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu">
                            <li className="w-100">
                                <Link to="/HomeA"  className="nav-link text-white px-0 align-middle"> <i className="fs-4 bi-speedometer2 ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Admin Dashboard</span>
                                </Link>
                            </li>

                            <li className="w-100">
                                <Link to="/HomeA/employee"   className="nav-link px-0 align-middle text-white" >
                                <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                                    Manage Employees
                                    </span>
                                    </Link>
                            </li>
                            
                            <li className="w-100">
                                <Link to="/HomeA/Category" className="nav-link px-0 align-middle text-white"> <i className="fs-4 bi-columns ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline"></span>
                                    Category
                                    </Link>
                            </li> 

                            <li className="w-100">
                                <Link to="/HomeA"   className="nav-link px-0 align-middle text-white">  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                                        Profile
                                        </span>
                                        </Link>
                            </li>
                            <li className="w-100" onClick={handleLogout} >
                                <Link to="/loginformA"className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi-power ms-2"></i>
                                <span className="ms-2 d-none d-sm-inline">  Logout </span></Link>
                            </li>
                        </ul>
                   </div>

                </div>
                <div className="col p-0 m-0">
                <div  className="p-2 d-flex justify-content-center shadow">
                    <h4> Employee Managament </h4>
                </div>
                <Outlet />
            </div>
            </div>
           




        </div>

        
        
    );
};

export default HomeA;