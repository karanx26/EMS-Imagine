import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendanceA = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [selectedDay, setSelectedDay] = useState(new Date().toLocaleString('en-US', { weekday: 'long' }));

  useEffect(() => {
    axios.get("http://localhost:8001/employees")
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  useEffect(() => {
    const date = new Date(selectedYear, selectedMonth - 1, selectedDate);
    setSelectedDay(date.toLocaleString('en-US', { weekday: 'long' }));
  }, [selectedYear, selectedMonth, selectedDate]);

  const handleAttendanceChange = (uid, event) => {
    const { name } = event.target;
    setAttendance(prevAttendance => ({
      ...prevAttendance,
      [uid]: {
        ...prevAttendance[uid],
        [name]: !prevAttendance[uid]?.[name]
      }
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const attendanceData = {
      year: selectedYear,
      month: selectedMonth,
      date: selectedDate,
      day: selectedDay,
      data: attendance
    };
    axios.post("http://localhost:8001/attendance", attendanceData)
      .then(response => {
        console.log(response.data);
        alert(`Attendance recorded successfully for ${selectedDay}, ${selectedDate}-${selectedMonth}-${selectedYear}`);
      })
      .catch(error => {
        console.error("Error recording attendance:", error);
      });
  };

  const years = Array.from(new Array(20), (_, index) => new Date().getFullYear() - 10 + index); // 10 years back and 10 years ahead
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const days = Array.from(new Array(31), (_, index) => index + 1);

  const tableStyles = {
    width: '100%',
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

  const checkboxStyles = {
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      <h2><b>Attendance Sheet</b></h2>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="year">Year: </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{ padding: '0.5rem', marginLeft: '1rem' }}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="month">Month: </label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{ padding: '0.5rem', marginLeft: '1rem' }}
          >
            {monthNames.map((month, index) => (
              <option key={index} value={index + 1}>{month}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="date">Date: </label>
          <select
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ padding: '0.5rem', marginLeft: '1rem' }}
          >
            {days.map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Day: </label>
          <span>{selectedDay}</span>
        </div>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={thStyles}>UID</th>
              <th style={thStyles}>Name</th>
              <th style={thStyles}>Present</th>
              <th style={thStyles}>Absent</th>
              <th style={thStyles}>Sick Leave</th>
              <th style={thStyles}>Annual Leave</th>
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
                    style={{ ...checkboxStyles, backgroundColor: 'green' }}
                  />
                </td>
                <td style={tdStyles}>
                  <input
                    type="checkbox"
                    name="absent"
                    checked={attendance[employee.uid]?.absent || false}
                    onChange={(e) => handleAttendanceChange(employee.uid, e)}
                    style={{ ...checkboxStyles, backgroundColor: 'blue' }}
                  />
                </td>
                <td style={tdStyles}>
                  <input
                    type="checkbox"
                    name="sickLeave"
                    checked={attendance[employee.uid]?.sickLeave || false}
                    onChange={(e) => handleAttendanceChange(employee.uid, e)}
                    style={{ ...checkboxStyles, backgroundColor: 'red' }}
                  />
                </td>
                <td style={tdStyles}>
                  <input
                    type="checkbox"
                    name="annualLeave"
                    checked={attendance[employee.uid]?.annualLeave || false}
                    onChange={(e) => handleAttendanceChange(employee.uid, e)}
                    style={{ ...checkboxStyles, backgroundColor: 'yellow' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'black', border: 'none', cursor: 'pointer' }}>
          Submit Attendance
        </button>
      </form>
    </div>
  );
};

export default AttendanceA;
