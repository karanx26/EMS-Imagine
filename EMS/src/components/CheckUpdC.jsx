import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function CheckUpdC() {
  const [documents, setDocuments] = useState([]);

  const [userId, setUserId] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      setUserId(uid);
    }
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get(`http://localhost:8001/clientDocuments/${userId}`);
        setDocuments(res.data);
      } catch (err) {
        console.error('Error fetching documents:', err);
      }
    };
    fetchDocuments();
  }, [userId]);

  

  

  return (
    <div className="container mt-5">
      
      <h4 className="mt-5 text-center">Documents</h4>
      {documents.length === 0 ? (
        <p className="text-center">No documents uploaded.</p>
      ) : (
        <div className="card mt-3" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <ul className="list-group list-group-flush">
            {documents.map((doc) => (
              <li key={doc._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{doc.documentName}</strong> - <a href={`http://localhost:8001/${doc.docs[0]}`} target="_blank" rel="noopener noreferrer">View</a>
                </div>
                
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CheckUpdC;
