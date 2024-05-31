import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

function HomeA(){

    const location = useLocation()

    return (
        <div className="homepage">
            {/* <h1> Hello{location.state.id} and Welcome to Dashboard</h1> */}
            <h1>Admin Dashboard</h1>




        </div>
    )
}

export default HomeA;