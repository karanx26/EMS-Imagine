import React, { useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

const ReimbursementE = () => {
  const [formData, setFormData] = useState({
    employeeUID: '',
    employeeName: '',
    expenseType: '',
    description: '',
    startDate: '',
    endDate: '',
    proofs: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      proofs: [...formData.proofs, ...Array.from(e.target.files)]
    });
  };

  const handleFileDelete = (index) => {
    const newProofs = formData.proofs.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      proofs: newProofs
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('employeeUID', formData.employeeUID);
    data.append('employeeName', formData.employeeName);
    data.append('expenseType', formData.expenseType);
    data.append('description', formData.description);
    data.append('startDate', formData.startDate);
    data.append('endDate', formData.endDate);
    formData.proofs.forEach((proof, index) => {
      data.append(`proofs[${index}]`, proof);
    });

    axios.post('/api/reimbursement', data)
      .then(response => {
        console.log('Form data submitted:', response.data);
      })
      .catch(error => {
        console.error('Error submitting form data:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center bg-orange text-Black">
              <h2>Reimbursement Form</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="employeeUID" className="form-label">Employee UID:</label>
                  <input
                    type="text"
                    id="employeeUID"
                    name="employeeUID"
                    value={formData.employeeUID}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="employeeName" className="form-label">Employee Name:</label>
                  <input
                    type="text"
                    id="employeeName"
                    name="employeeName"
                    value={formData.employeeName}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="expenseType" className="form-label">Expense Type:</label>
                  <select
                    id="expenseType"
                    name="expenseType"
                    value={formData.expenseType}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select Expense Type</option>
                    <option value="raw-material">Raw Material</option>
                    <option value="food-accommodation">Food & Accommodation</option>
                    <option value="travelling-fuel">Travelling & Fuel</option>
                    <option value="advance-payment">Advance Payment</option>
                    <option value="stamp-paper">Stamp Paper</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="description" className="form-label">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="form-control"
                    rows="4"
                  />
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="startDate" className="form-label">Expense Start Date:</label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="endDate" className="form-label">Expense End Date:</label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="proofs" className="form-label">Proof of Expense (PDF):</label>
                  <input
                    type="file"
                    id="proofs"
                    name="proofs"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    multiple
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
              {formData.proofs.length > 0 && (
                <div className="mt-4">
                  <h4>Uploaded Files:</h4>
                  <ul>
                    {formData.proofs.map((file, index) => (
                      <li key={index} className="d-flex justify-content-between align-items-center">
                        <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
                          {file.name}
                        </a>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm ml-2"
                          onClick={() => handleFileDelete(index)}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReimbursementE;
