

import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendanceA = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    axios.get("http://localhost:8001/employees")
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const handleAttendanceChange = (uid, event) => {
    const { name, checked } = event.target;
    setAttendance(prevAttendance => ({
      ...prevAttendance,
      [uid]: {
        ...prevAttendance[uid],
        [name]: checked
      }
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const attendanceData = {
      year: selectedYear,
      month: selectedMonth,
      data: attendance
    };
    axios.post("http://localhost:8001/attendance", attendanceData)
      .then(response => {
        console.log(response.data);
        alert("Attendance recorded successfully");
      })
      .catch(error => {
        console.error("Error recording attendance:", error);
      });
  };

  const years = Array.from(new Array(10), (_, index) => new Date().getFullYear() - index);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

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

  const checkboxStyles = (color) => ({
    width: '20px',
    height: '20px',
    backgroundColor: color,
    cursor: 'pointer'
  });

  return (
    <div>
      <h2>Attendance Sheet</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="year">Year: </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="month">Month: </label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>UID</th>
              <th style={thStyles}>Name</th>
              <th style={thStyles}>Present</th>
              <th style={thStyles}>Annual Leave</th>
              <th style={thStyles}>Sick Leave</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.uid}>
                <td style={tdStyles}>{employee.uid}</td>
                <td style={tdStyles}>{employee.name}</td>
                <td style={tdStyles}>
                  <input
                    type="checkbox"
                    name="present"
                    checked={attendance[employee.uid]?.present || false}
                    onChange={(e) => handleAttendanceChange(employee.uid, e)}
                    style={checkboxStyles('green')}
                  />
                </td>
                <td style={tdStyles}>
                  <input
                    type="checkbox"
                    name="annualLeave"
                    checked={attendance[employee.uid]?.annualLeave || false}
                    onChange={(e) => handleAttendanceChange(employee.uid, e)}
                    style={checkboxStyles('yellow')}
                  />
                </td>
                <td style={tdStyles}>
                  <input
                    type="checkbox"
                    name="sickLeave"
                    checked={attendance[employee.uid]?.sickLeave || false}
                    onChange={(e) => handleAttendanceChange(employee.uid, e)}
                    style={checkboxStyles('red')}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Submit Attendance
        </button>
      </form>
    </div>
  );
};

export default AttendanceA;


