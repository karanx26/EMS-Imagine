import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskA = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [taskDetails, setTaskDetails] = useState({ task: "", deadline: "" });
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showPending, setShowPending] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8001/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleTaskChange = (field, value) => {
    setTaskDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const task = {
        uid: selectedEmployee,
        ...taskDetails,
        status: "Pending",
      };

      await axios.post("http://localhost:8001/tasks", { tasks: [task] });
      alert("Task assigned successfully!");
      setTaskDetails({ task: "", deadline: "" });
      fetchPendingTasks(); // Fetch and update pending tasks immediately after assigning
    } catch (error) {
      console.error("Error assigning task:", error);
      alert("Error assigning task.");
    }
  };

  const fetchPendingTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8001/tasks?status=Pending");
      setPendingTasks(response.data);
      setShowPending(true);
      setShowCompleted(false);
    } catch (error) {
      console.error("Error fetching pending tasks:", error);
    }
  };

  const fetchCompletedTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8001/tasks?status=Done");
      setCompletedTasks(response.data);
      setShowPending(false);
      setShowCompleted(true);
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8001/tasks/${taskId}`);
      setPendingTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId));
      setCompletedTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId));
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task.");
    }
  };

  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  };

  const thTdStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  const thStyle = {
    backgroundColor: "#f2f2f2",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "5px",
  };

  return (
    <div style={containerStyle}>
      <h2>Task Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee:</label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            style={inputStyle}
          >
            <option value="" disabled>
              Select an employee
            </option>
            {employees.map((employee) => (
              <option key={employee.uid} value={employee.uid}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Task:</label>
          <input
            type="text"
            style={inputStyle}
            value={taskDetails.task}
            onChange={(e) => handleTaskChange("task", e.target.value)}
          />
        </div>
        <div>
          <label>Deadline:</label>
          <input
            type="date"
            style={inputStyle}
            value={taskDetails.deadline}
            onChange={(e) => handleTaskChange("deadline", e.target.value)}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Assign Task
        </button>
      </form>
      <button onClick={fetchPendingTasks} style={buttonStyle}>
        Show All Pending Tasks
      </button>
      <button onClick={fetchCompletedTasks} style={buttonStyle}>
        Show All Completed Tasks
      </button>
      {showPending && (
        <div>
          <h3>Pending Tasks</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{ ...thTdStyle, ...thStyle }}>Task</th>
                <th style={{ ...thTdStyle, ...thStyle }}>Employee Name</th>
                <th style={{ ...thTdStyle, ...thStyle }}>Deadline</th>
                <th style={{ ...thTdStyle, ...thStyle }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingTasks.map((task) => (
                <tr key={task._id}>
                  <td style={thTdStyle}>{task.task}</td>
                  <td style={thTdStyle}>{employees.find(e => e.uid === task.uid)?.name}</td>
                  <td style={thTdStyle}>{new Date(task.deadline).toLocaleDateString()}</td>
                  <td style={thTdStyle}>
                    <button style={buttonStyle} onClick={() => handleDeleteTask(task._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showCompleted && (
        <div>
          <h3>Completed Tasks</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{ ...thTdStyle, ...thStyle }}>Task</th>
                <th style={{ ...thTdStyle, ...thStyle }}>Employee Name</th>
                <th style={{ ...thTdStyle, ...thStyle }}>Deadline</th>
                <th style={{ ...thTdStyle, ...thStyle }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((task) => (
                <tr key={task._id}>
                  <td style={thTdStyle}>{task.task}</td>
                  <td style={thTdStyle}>{employees.find(e => e.uid === task.uid)?.name}</td>
                  <td style={thTdStyle}>{new Date(task.deadline).toLocaleDateString()}</td>
                  <td style={thTdStyle}>
                    <button style={buttonStyle} onClick={() => handleDeleteTask(task._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TaskA;
