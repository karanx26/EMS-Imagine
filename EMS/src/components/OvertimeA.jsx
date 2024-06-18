import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Overtime.css";

function OvertimeA() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeUid, setSelectedEmployeeUid] = useState("");
  const [overtimeData, setOvertimeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8001/employees");
        setEmployees(response.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Error fetching employees. Please try again later.");
      }
    };

    fetchEmployees();
  }, []);

  const fetchOvertimeDataByEmployee = async (uid) => {
    if (!uid) {
      setError("Please select a valid Employee.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:8001/overtime/employee/${uid}`);
      setOvertimeData(response.data);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data.message}`);
      } else if (err.request) {
        setError("Error: No response from the server. Please try again later.");
      } else {
        setError("Error: There was an error fetching the overtime data!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overtime-container">
      <h1>Admin: Overtime Records by Employee</h1>

      <div className="employee-search-form">
        <select
          value={selectedEmployeeUid}
          onChange={(e) => setSelectedEmployeeUid(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee.uid} value={employee.uid}>
              {employee.name}
            </option>
          ))}
        </select>
        <button onClick={() => fetchOvertimeDataByEmployee(selectedEmployeeUid)}>
          Fetch Overtime Records
        </button>
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
            </tr>
          </thead>
          <tbody>
            {overtimeData.map((record) => (
              <tr key={record._id}>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.hours}</td>
                <td>{record.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default OvertimeA;
