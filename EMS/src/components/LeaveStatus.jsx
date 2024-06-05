// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import "bootstrap-icons/font/bootstrap-icons.css";
// import "bootstrap/dist/css/bootstrap.min.css";


// const LeaveStatus = () => {
//   const [leaveStatus, setLeaveStatus] = useState(null);
//   const [error, setError] = useState(null);

  

//   useEffect(() => {
//     // Fetch leave status from the server
//     axios.get('/api/leave/status')
//       .then(response => {
//         setLeaveStatus(response.data);
//       })
//       .catch(error => {
//         setError(error.message);
//       });
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!leaveStatus) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card">
//             <div className="card-header text-center">
//               <h2>Leave Application Status</h2>
//             </div>
//             <div className="card-body">
//               <div className="form-group mb-3">
//                 <label>Status:</label>
//                 <p>{leaveStatus.status}</p>
//               </div>
//               <div className="form-group mb-3">
//                 <label>Comments:</label>
//                 <p>{leaveStatus.comments}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaveStatus;

import React from "react";
import { useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const LeaveStatus = () => {
  const location = useLocation();
  const { state: leaveStatus } = location;

  console.log('Leave status data:', leaveStatus); // Add this line to debug

  if (!leaveStatus) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center">
              <h2>Leave Application Status</h2>
            </div>
            <div className="card-body">
              <div className="form-group mb-3">
                <label>Status:</label>
                <p>{leaveStatus.status}</p>
              </div>
              <div className="form-group mb-3">
                <label>Comments:</label>
                <p>{leaveStatus.comments}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveStatus;


