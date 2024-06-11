import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const ReimbursementE = () => {
  const [formData, setFormData] = useState({
    uid: "",
    expenseType: "",
    description: "",
    startDate: "",
    endDate: "",
    proofs: [],
    vehicleType: "",
    totalKms: "",
    totalExpense: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      setFormData((prevFormData) => ({ ...prevFormData, uid }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [name]: value };
      if (name === "vehicleType" || name === "totalKms") {
        return {
          ...updatedFormData,
          totalExpense: calculateTotalExpense(
            updatedFormData.vehicleType,
            updatedFormData.totalKms
          ),
        };
      }
      return updatedFormData;
    });
  };

  const calculateTotalExpense = (vehicleType, totalKms) => {
    if (!vehicleType || !totalKms) return 0;
    const km = parseFloat(totalKms);
    let ratePerKm = 0;
    switch (vehicleType) {
      case "2wheel":
        ratePerKm = 3;
        break;
      case "4cng":
        ratePerKm = 6;
        break;
      case "4pd":
        ratePerKm = 8;
        break;
      default:
        ratePerKm = 0;
    }
    return km * ratePerKm;
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      proofs: [...formData.proofs, ...Array.from(e.target.files)],
    });
  };

  const handleFileDelete = (index) => {
    const newProofs = formData.proofs.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      proofs: newProofs,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("uid", formData.uid);
      data.append("expenseType", formData.expenseType);
      data.append("description", formData.description);
      data.append("startDate", formData.startDate);
      data.append("endDate", formData.endDate);
      formData.proofs.forEach((proof) => {
        data.append("proofs", proof);
      });

      if (formData.expenseType === "fuel") {
        data.append("vehicleType", formData.vehicleType);
        data.append("totalKms", formData.totalKms);
        data.append("totalExpense", formData.totalExpense);
      }

      const response = await axios.post(
        "http://localhost:8001/reimbursement",
        data
      );
      console.log(response.data);
      alert("Form submitted successfully!"); // Show success alert
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Error submitting form. Please try again."); // Show error alert
    }
  };

  const handleViewApplications = () => {
    navigate("/homee/viewreimbe");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center bg-orange text-Black">
              <h2>REIMBURSEMENT FORM</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="uid" className="form-label">
                    Employee UID:
                  </label>
                  <input
                    type="text"
                    id="uid"
                    name="uid"
                    value={formData.uid}
                    readOnly
                    className="form-control"
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="expenseType" className="form-label">
                    Expense Type:
                  </label>
                  <select
                    id="expenseType"
                    name="expenseType"
                    value={formData.expenseType}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select Expense Type</option>
                    <option value="fuel">Fuel</option>
                    <option value="raw-material">Raw Material</option>
                    <option value="food-accommodation">
                      Food & Accommodation
                    </option>
                    <option value="travelling">Travelling</option>
                    <option value="advance-payment">Advance Payment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {formData.expenseType === "fuel" && (
                  <>
                    <div className="form-group mb-4">
                      <label htmlFor="vehicleType" className="form-label">
                        Vehicle Type:
                      </label>
                      <select
                        id="vehicleType"
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        required
                        className="form-select"
                      >
                        <option value="">Select Vehicle Type</option>
                        <option value="4cng">
                          4 Wheeler (CNG) (6/- per Km)
                        </option>
                        <option value="4pd">
                          4 Wheeler (Petrol/Diesel) (8/- per Km)
                        </option>
                        <option value="2wheel">2 Wheeler (3/- per Km)</option>
                      </select>
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="totalKms" className="form-label">
                        Total Kilometers:
                      </label>
                      <input
                        type="number"
                        id="totalKms"
                        name="totalKms"
                        value={formData.totalKms}
                        onChange={handleChange}
                        required
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="totalExpense" className="form-label">
                        Total Expense:
                      </label>
                      <input
                        type="number"
                        id="totalExpense"
                        name="totalExpense"
                        value={formData.totalExpense}
                        readOnly
                        className="form-control"
                      />
                    </div>
                  </>
                )}

                <div className="form-group mb-4">
                  <label htmlFor="description" className="form-label">
                    Description:
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                  />
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="startDate" className="form-label">
                        Expense Start Date:
                      </label>
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
                      <label htmlFor="endDate" className="form-label">
                        Expense End Date:
                      </label>
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
                  <label htmlFor="proofs" className="form-label">
                    Proof of Expense:
                  </label>
                  <input
                    type="file"
                    id="proofs"
                    name="proofs"
                    onChange={handleFileChange}
                    multiple
                    className="form-control"
                  />
                </div>
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  
                </div>
              </form>
              {formData.proofs.length > 0 && (
                <div className="mt-4">
                  <h4>Uploaded Files:</h4>
                  <ul>
                    {formData.proofs.map((file, index) => (
                      <li
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <a
                          href={URL.createObjectURL(file)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {file.name}
                        </a>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm ml-2 mt-1 mb-1"
                          onClick={() => handleFileDelete(index)}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="form-group text-center">
              <button
                    type="button"
                    className="btn btn-success mt-5"
                    onClick={handleViewApplications}
                  >
                    View Applications
                  </button>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReimbursementE;
