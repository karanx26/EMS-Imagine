import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/ManageClient.css"; // Import custom CSS for styling

function ManageClientA() {
  const [clients, setClients] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.removeItem("isLoggedIn");
    window.localStorage.removeItem("isLoggedIn");

    // Fetch clients from the backend
    axios.get("http://localhost:8001/clients")
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.error("Error fetching clients:", error);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredClients = clients.filter(client => 
    filter === "" || client.clientType === filter
  );

  return (
    <>
      <div id="manage-client-container">
        <div className="button-container">
          <Link to="/homea/addclienta" className="manage-button">
            <i className="bi bi-person-plus-fill"></i>
            Add Clients
          </Link>
        </div>

        <div className="filter-container">
          <label htmlFor="clientTypeFilter">Filter by Client Type:</label>
          <select
            id="clientTypeFilter"
            value={filter}
            onChange={handleFilterChange}
            className="form-control"
          >
            <option value="">All</option>
            <option value="Retail">Retail</option>
            <option value="Commercial">Commercial</option>
            <option value="Government">Government</option>
          </select>
        </div>

        <table className="table table-striped table-bordered client-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Client Type</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Google Map Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client.uid}>
                <td>{client.name}</td>
                <td>{client.clientType}</td>
                <td>{client.phone}</td>
                <td>{client.address}</td>
                <td><a href={client.locationLink} target="_blank" rel="noopener noreferrer">View Location</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ManageClientA;
