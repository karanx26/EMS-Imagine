import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AttendanceE = () => {
  const { uid } = useParams(); // Retrieve the uid parameter from the URL
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div>
      <h2>Attendance Records for UID: {uid}</h2>
      {attendanceRecords.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Leave</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record, index) => (
              <tr key={index}>
                <td>{`${record.date}-${record.month}-${record.year}`}</td>
                <td>{record.day}</td>
                <td>{record.data[uid]?.present ? "Yes" : "No"}</td>
                <td>{record.data[uid]?.absent ? "Yes" : "No"}</td>
                <td>{record.data[uid]?.leave ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceE;
