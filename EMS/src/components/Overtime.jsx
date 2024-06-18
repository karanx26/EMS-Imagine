// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/Overtime.css"; // Create and import your custom CSS

// function Overtime() {
//   const [overtimeData, setOvertimeData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [date, setDate] = useState("");
//   const [hours, setHours] = useState("");
//   const [description, setDescription] = useState("");
//   const [uid, setUid] = useState(window.localStorage.getItem("uid")); // Set your user ID here or get it dynamically

//   useEffect(() => {
//     fetchOvertimeData();
//   }, []);

//   const fetchOvertimeData = () => {
//     axios.get("http://localhost:8001/overtime")
//       .then(response => {
//         setOvertimeData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError("There was an error fetching the overtime data!");
//         setLoading(false);
//       });
//   };

//   const handleAddOvertime = () => {
//     if (!uid || !date || !hours || !description) {
//       window.alert("All fields are required!");
//       return;
//     }

//     const newOvertime = { uid, date, hours, description };
//     axios.post("http://localhost:8001/overtime", newOvertime)
//       .then(response => {
//         fetchOvertimeData();
//         setUid("defaultUserId"); // Reset to your default user ID or logic to get the user ID dynamically
//         setDate("");
//         setHours("");
//         setDescription("");
//         setError(null);
//       })
//       .catch(error => {
//         setError("There was an error adding the overtime record!");
//         window.alert("There was an error adding the overtime record!");
//       });
//   };

//   return (
//     <div className="overtime-container">
//       <h1>Overtime Records</h1>

//       <div className="add-overtime-form">
//         <h2>Add Overtime</h2>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           placeholder="Date"
//         />
//         <input
//           type="number"
//           value={hours}
//           onChange={(e) => setHours(e.target.value)}
//           placeholder="Hours"
//         />
//         <input
//           type="text"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Description"
//         />
//         <button onClick={handleAddOvertime}>Add Overtime</button>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Hours</th>
//               <th>Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             {overtimeData.map((record) => (
//               <tr key={record._id}>
//                 <td>{new Date(record.date).toLocaleDateString()}</td>
//                 <td>{record.hours}</td>
//                 <td>{record.description}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// }

// export default Overtime;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Overtime.css";

function Overtime() {
  const [overtimeData, setOvertimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [description, setDescription] = useState("");
  const [uid, setUid] = useState(window.localStorage.getItem("uid"));

  useEffect(() => {
    fetchOvertimeData();
  }, []);

  const fetchOvertimeData = () => {
    axios.get("http://localhost:8001/overtime")
      .then(response => {
        setOvertimeData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("There was an error fetching the overtime data!");
        setLoading(false);
      });
  };

  const handleAddOvertime = () => {
    if (!uid || !date || !hours || !description) {
      window.alert("All fields are required!");
      return;
    }

    const newOvertime = { uid, date, hours, description };
    axios.post("http://localhost:8001/overtime", newOvertime)
      .then(response => {
        fetchOvertimeData();
        setDate("");
        setHours("");
        setDescription("");
        setError(null);
      })
      .catch(error => {
        setError("There was an error adding the overtime record!");
        window.alert("There was an error adding the overtime record!");
      });
  };

  const handleDeleteOvertime = (id) => {
    axios.delete(`http://localhost:8001/overtime/${id}`)
      .then(response => {
        fetchOvertimeData();
      })
      .catch(error => {
        setError("There was an error deleting the overtime record!");
        window.alert("There was an error deleting the overtime record!");
      });
  };

  const handleUpdateOvertime = (id) => {
    const updatedOvertime = { date, hours, description };
    axios.put(`http://localhost:8001/overtime/${id}`, updatedOvertime)
      .then(response => {
        fetchOvertimeData();
        setDate("");
        setHours("");
        setDescription("");
        setError(null);
      })
      .catch(error => {
        setError("There was an error updating the overtime record!");
        window.alert("There was an error updating the overtime record!");
      });
  };

  return (
    <div className="overtime-container">
      <h1>Overtime Records</h1>

      <div className="add-overtime-form">
        <h2>Add Overtime</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
        />
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          placeholder="Hours"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button onClick={handleAddOvertime}>Add Overtime</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Hours</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {overtimeData.map((record) => (
              <tr key={record._id}>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.hours}</td>
                <td>{record.description}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDeleteOvertime(record._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Overtime;
