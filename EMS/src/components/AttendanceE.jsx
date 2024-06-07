import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AttendanceE = () => {
  const { uid } = useParams(); // Retrieve the uid parameter from the URL
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define CSS styles as constants
  const containerStyle = {
    margin: "40px auto", // Center the container horizontally
    padding: "20px",
    border: "1px solid #ccc",
    width: '60%',
    maxWidth: '600px',
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse"
  };

  const cellStyle = {
    border: "1px solid #ddd",
    padding: "8px"
  };

  const headerCellStyle = {
    ...cellStyle,
    backgroundColor: "#f2f2f2",
    fontWeight: "bold"
  };

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const res = await axios.get(`http://localhost:8001/attendance/${uid}`);
        setAttendanceRecords(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching attendance records:", err);
        setError("Failed to fetch attendance records.");
        setLoading(false);
      }
    };

    fetchAttendanceRecords();
  }, [uid]); // Fetch attendance records whenever uid changes

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={containerStyle}>
      <h2 className="text-center">Attendance Records</h2>
      {attendanceRecords.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table style={tableStyle} className="text-center">
          <thead>
            <tr>
              <th style={headerCellStyle}>Date</th>
              <th style={headerCellStyle}>Day</th>
              <th style={headerCellStyle}>Present</th>
              <th style={headerCellStyle}>Absent</th>
              <th style={headerCellStyle}>Leave</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record, index) => (
              <tr key={index}>
                <td style={cellStyle}>{`${record.date}-${record.month}-${record.year}`}</td>
                <td style={cellStyle}>{record.day}</td>
                <td style={cellStyle}>{record.data[uid]?.present ? "Yes" : "-"}</td>
                <td style={cellStyle}>{record.data[uid]?.absent ? "Yes" : "-"}</td>
                <td style={cellStyle}>{record.data[uid]?.leave ? "Yes" : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceE;
