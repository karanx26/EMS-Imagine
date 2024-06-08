// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TaskA = () => {
//   const [employees, setEmployees] = useState([]);
//   const [tasks, setTasks] = useState({});

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get("http://localhost:8001/employees");
//         setEmployees(response.data);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const handleTaskChange = (uid, field, value) => {
//     setTasks((prevTasks) => ({
//       ...prevTasks,
//       [uid]: {
//         ...prevTasks[uid],
//         [field]: value,
//       },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const tasksArray = Object.keys(tasks).map(uid => ({
//         uid,
//         ...tasks[uid],
//       }));

//       await axios.post("http://localhost:8001/tasks", { tasks: tasksArray });
//       alert("Tasks assigned successfully!");
//     } catch (error) {
//       console.error("Error assigning tasks:", error);
//       alert("Error assigning tasks.");
//     }
//   };

//   const containerStyle = {
//     maxWidth: "800px",
//     margin: "0 auto",
//     padding: "20px",
//     border: "1px solid #ccc",
//     borderRadius: "10px",
//     boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
//   };

//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: "20px"
//   };

//   const thTdStyle = {
//     border: "1px solid #ddd",
//     padding: "8px",
//     textAlign: "left"
//   };

//   const thStyle = {
//     backgroundColor: "#f2f2f2"
//   };

//   const inputStyle = {
//     width: "100%",
//     padding: "8px",
//     boxSizing: "border-box"
//   };

//   const buttonStyle = {
//     padding: "10px 20px",
//     backgroundColor: "#4CAF50",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer"
//   };

//   return (
//     <div style={containerStyle}>
//       <h2>Task Assignment</h2>
//       <form onSubmit={handleSubmit}>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={{ ...thTdStyle, ...thStyle }}>Employee Name</th>
//               <th style={{ ...thTdStyle, ...thStyle }}>Task</th>
//               <th style={{ ...thTdStyle, ...thStyle }}>Deadline</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((employee) => (
//               <tr key={employee.uid}>
//                 <td style={thTdStyle}>{employee.name}</td>
//                 <td style={thTdStyle}>
//                   <input
//                     type="text"
//                     style={inputStyle}
//                     value={tasks[employee.uid]?.task || ""}
//                     onChange={(e) =>
//                       handleTaskChange(employee.uid, "task", e.target.value)
//                     }
//                   />
//                 </td>
//                 <td style={thTdStyle}>
//                   <input
//                     type="date"
//                     style={inputStyle}
//                     value={tasks[employee.uid]?.deadline || ""}
//                     onChange={(e) =>
//                       handleTaskChange(employee.uid, "deadline", e.target.value)
//                     }
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button type="submit" style={buttonStyle}>Assign Tasks</button>
//       </form>
//     </div>
//   );
// };

// export default TaskA;

import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskA = () => {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState({});

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

  const handleTaskChange = (uid, field, value) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [uid]: {
        ...prevTasks[uid],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const tasksArray = Object.keys(tasks).map(uid => ({
        uid,
        ...tasks[uid],
        status: "Not Started", // Initialize status as "Not Started"
      }));

      await axios.post("http://localhost:8001/tasks", { tasks: tasksArray });
      alert("Tasks assigned successfully!");
    } catch (error) {
      console.error("Error assigning tasks:", error);
      alert("Error assigning tasks.");
    }
  };

  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px"
  };

  const thTdStyle = {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left"
  };

  const thStyle = {
    backgroundColor: "#f2f2f2"
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  };

  return (
    <div style={containerStyle}>
      <h2>Task Assignment</h2>
      <form onSubmit={handleSubmit}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{ ...thTdStyle, ...thStyle }}>Employee Name</th>
              <th style={{ ...thTdStyle, ...thStyle }}>Task</th>
              <th style={{ ...thTdStyle, ...thStyle }}>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.uid}>
                <td style={thTdStyle}>{employee.name}</td>
                <td style={thTdStyle}>
                  <input
                    type="text"
                    style={inputStyle}
                    value={tasks[employee.uid]?.task || ""}
                    onChange={(e) =>
                      handleTaskChange(employee.uid, "task", e.target.value)
                    }
                  />
                </td>
                <td style={thTdStyle}>
                  <input
                    type="date"
                    style={inputStyle}
                    value={tasks[employee.uid]?.deadline || ""}
                    onChange={(e) =>
                      handleTaskChange(employee.uid, "deadline", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" style={buttonStyle}>Assign Tasks</button>
      </form>
    </div>
  );
};

export default TaskA;
