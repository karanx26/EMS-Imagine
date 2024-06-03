import React from 'react'
// import { useLocation,useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";


function HomeA(){ 

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
                        <ul>
                            <li>
                                <Link to="/HomeA">Admin Dashboard</Link>
                            </li>

                            <li>
                                <Link to="/HomeA">Manage Employees</Link>
                            </li>
                            
                            <li>
                                <Link to="/HomeA">Category</Link>
                            </li> 

                            <li>
                                <Link to="/HomeA">Profile</Link>
                            </li>
                            <li>
                                <Link to="/HomeA">Logout</Link>
                            </li>
                        </ul>
                   </div>

                </div>
            </div>




        </div>
    )
}

export default HomeA;