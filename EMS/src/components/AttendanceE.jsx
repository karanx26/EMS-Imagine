// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const AttendanceE = () => {
//   const { uid } = useParams(); // Retrieve the uid parameter from the URL
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Define CSS styles as constants
//   const containerStyle = {
//     margin: "40px auto", // Center the container horizontally
//     padding: "20px",
//     border: "1px solid #ccc",
//     width: '60%',
//     maxWidth: '600px',
//   };

//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse"
//   };

//   const cellStyle = {
//     border: "1px solid #ddd",
//     padding: "8px"
//   };

//   const headerCellStyle = {
//     ...cellStyle,
//     backgroundColor: "#f2f2f2",
//     fontWeight: "bold"
//   };

//   useEffect(() => {
//     const fetchAttendanceRecords = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8001/attendance/${uid}`);
//         setAttendanceRecords(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching attendance records:", err);
//         setError("Failed to fetch attendance records.");
//         setLoading(false);
//       }
//     };

//     fetchAttendanceRecords();
//   }, [uid]); // Fetch attendance records whenever uid changes

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div style={containerStyle}>
//       <h3 className="text-center mb-3">Attendance Records</h3>
//       {attendanceRecords.length === 0 ? (
//         <p>No attendance records found.</p>
//       ) : (
//         <table style={tableStyle} className="text-center">
//           <thead>
//             <tr>
//               <th style={headerCellStyle}>Date</th>
//               <th style={headerCellStyle}>Day</th>
//               <th style={headerCellStyle}>Present</th>
//               <th style={headerCellStyle}>Absent</th>
//               <th style={headerCellStyle}>Leave</th>
//             </tr>
//           </thead>
//           <tbody>
//             {attendanceRecords.map((record, index) => (
//               <tr key={index}>
//                 <td style={cellStyle}>{`${record.date}-${record.month}-${record.year}`}</td>
//                 <td style={cellStyle}>{record.day}</td>
//                 <td style={cellStyle}>{record.data[uid]?.present ? "Yes" : "-"}</td>
//                 <td style={cellStyle}>{record.data[uid]?.absent ? "Yes" : "-"}</td>
//                 <td style={cellStyle}>{record.data[uid]?.leave ? "Yes" : "-"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AttendanceE;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AttendanceE = () => {
  const navigate = useNavigate();
  const { uid } = useParams();
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [loading, setLoading] = useState(false);

  const years = Array.from(new Array(20), (_, index) => new Date().getFullYear() - 10 + index); // 10 years back and 10 years ahead
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  

  useEffect(() => {
    if (uid) {
      fetchAttendanceData();
    }
  }, [selectedYear, selectedMonth, uid]);

  

  const fetchAttendanceData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8001/attendance/${selectedYear}/${selectedMonth}/employee/${uid}`);
      setAttendanceData(response.data);
    } catch (error) {
      console.error("Error fetching monthly attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  

  const tableStyles = {
    width: '70%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  };

  const thStyles = {
    border: '1px solid #ddd',
    padding: '10px',
    backgroundColor: '#f2f2f2',
    textAlign: 'center'
  };

  const tdStyles = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center'
  };

  const selectStyles = {
    padding: '0.5rem',
    margin: '0 0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    backgroundColor: 'white'
  };

  const dateContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  };



  

  const cardStyles = {
    flex: '1',
    paddingTop: '12px',
    margin: '0 5px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  };

  const cardContainerStyles = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '10px',
    width: '60%',
    maxWidth: '600px',
    flexWrap: 'wrap'
  };

  const calculateTotals = (attendanceData) => {
    let totals = { present: 0, absent: 0, leave: 0 };

    attendanceData.forEach(record => {
      if (record.status.present) totals.present++;
      if (record.status.absent) totals.absent++;
      if (record.status.leave) totals.leave++;
    });

    return totals;
  };

  const totals = calculateTotals(attendanceData);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      margin: '20px',
    }}>
      <h2>Monthly Attendance</h2><br />
      <div style={dateContainerStyles}>
        <label htmlFor="year">Year:</label>
        <select
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          style={selectStyles}
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <label htmlFor="month">Month:</label>
        <select
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          style={selectStyles}
        >
          {monthNames.map((month, index) => (
            <option key={index} value={index + 1}>{month}</option>
          ))}
        </select>
        
      </div>
      <div style={cardContainerStyles}>
        <div style={cardStyles}>
          <h5>Present</h5>
          <p>{totals.present}</p>
        </div>
        <div style={cardStyles}>
          <h5>Absent</h5>
          <p>{totals.absent}</p>
        </div>
        <div style={cardStyles}>
          <h5>Leave</h5>
          <p>{totals.leave}</p>
        </div>
      </div>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>Date</th>
            <th style={thStyles}>Day</th>
            <th style={thStyles}>Present</th>
            <th style={thStyles}>Absent</th>
            <th style={thStyles}>Leave</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map(record => (
            <tr key={record.date}>
              <td style={tdStyles}>{record.date}</td>
              <td style={tdStyles}>{record.day}</td>
              <td style={tdStyles}>{record.status.present ? 'Yes' : '-'}</td>
              <td style={tdStyles}>{record.status.absent ? 'Yes' : '-'}</td>
              <td style={tdStyles}>{record.status.leave ? 'Yes' : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
    
    </div>
  );
};

export default AttendanceE;

