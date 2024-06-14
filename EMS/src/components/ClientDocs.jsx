import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function ClientDocs() {
  const { uid } = useParams();
  const [documents, setDocuments] = useState([]);
  const [documentName, setDocumentName] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get(`http://localhost:8001/clientDocuments/${uid}`);
        setDocuments(res.data);
      } catch (err) {
        console.error('Error fetching documents:', err);
      }
    };
    fetchDocuments();
  }, [uid]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("docs", file); // Make sure this matches the backend's expected field name
    formData.append("documentName", documentName);

    try {
      const res = await axios.post(`http://localhost:8001/clientDocuments/${uid}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setDocuments([...documents, res.data.document]);
      setDocumentName("");
      setFile(null);
      alert("Document uploaded successfully!");
    } catch (err) {
      console.error('Error uploading document:', err.response || err);
      alert("Failed to upload document.");
    }
  };

  const handleDelete = async (docId) => {
    try {
      const res = await axios.delete(`http://localhost:8001/clientDocuments/${uid}/${docId}`);
      console.log('Delete response:', res.data);
      setDocuments(documents.filter(doc => doc._id !== docId));
      alert("Document deleted successfully!");
    } catch (err) {
      console.error('Error deleting document:', err.response || err);
      alert("Failed to delete document.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Client Documents</h2>
      <form onSubmit={handleUpload}>
        <div className="form-group mb-3">
          <label>Document Name:</label>
          <input
            type="text"
            className="form-control"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Upload Document:</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
      <h3 className="mt-5">Existing Documents</h3>
      {documents.length === 0 ? (
        <p>No documents uploaded.</p>
      ) : (
        <ul className="list-group">
          {documents.map((doc) => (
            <li key={doc._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{doc.documentName}</strong> - <a href={`http://localhost:8001/${doc.docs[0]}`} target="_blank" rel="noopener noreferrer">View</a>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(doc._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClientDocs;
