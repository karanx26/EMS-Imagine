import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

const TaskE = () => {
  const { uid } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/tasks/${uid}`);
        setTasks(response.data);
      } catch (err) {
        setError("Error fetching tasks");
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [uid]);

  const containerStyle = {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    alignItems: "center",
    justifyContent: "center",
    
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "10px",
    border: "2px solid #ddd",
   
  };

  const thTdStyle = {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
    
  };

 


  return (
    <div style={containerStyle} >
      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p>{error}</p>
      ) : tasks.length ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle} b>Task</th>
              <th style={thTdStyle}>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{task.task}</td>
                <td style={thTdStyle}>{new Date(task.deadline).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks assigned.</p>
      )}
    </div>
  );
};

export default TaskE;
