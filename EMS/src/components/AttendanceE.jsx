import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendanceE = ({ uid }) => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8001/attendance/${uid}`)
      .then(response => {
        setAttendanceRecords(response.data);
      })
      .catch(error => {
        console.error("Error fetching attendance records:", error);
      });
  }, [uid]);

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  const thStyles = {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    textAlign: 'left'
  };

  const tdStyles = {
    border: '1px solid #ddd',
    padding: '8px'
  };

  return (
    <div>
      <h2>Attendance Records</h2>
      {attendanceRecords.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>Date</th>
              <th style={thStyles}>Day</th>
              <th style={thStyles}>Present</th>
              <th style={thStyles}>Absent</th>
              <th style={thStyles}>Sick Leave</th>
              <th style={thStyles}>Annual Leave</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record, index) => (
              <tr key={index}>
                <td style={tdStyles}>{`${record.date}-${record.month}-${record.year}`}</td>
                <td style={tdStyles}>{record.day}</td>
                <td style={tdStyles}>{record.data[uid].present ? 'Yes' : 'No'}</td>
                <td style={tdStyles}>{record.data[uid].absent ? 'Yes' : 'No'}</td>
                <td style={tdStyles}>{record.data[uid].sickLeave ? 'Yes' : 'No'}</td>
                <td style={tdStyles}>{record.data[uid].annualLeave ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceE;
