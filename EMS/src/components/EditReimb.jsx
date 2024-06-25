import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/ReimbursementE.css"; 

const EditReimb = () => {
  const [formData, setFormData] = useState({
    uid: "",
    expenseType: "",
    description: "",
    startDate: "",
    endDate: "",
    proofs: [],
    vehicleType: "",
    totalKms: "",
    totalExpense: "",
    gstType: "",
  });

  const [newFiles, setNewFiles] = useState([]); 

  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    const fetchReimbursement = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/reimbursements/${id}`
        );
        const data = response.data;
        setFormData({
          uid: data.uid,
          expenseType: data.expenseType,
          description: data.description,
          startDate: new Date(data.startDate).toISOString().split("T")[0],
          endDate: new Date(data.endDate).toISOString().split("T")[0],
          proofs: data.proofs || [],
          vehicleType: data.vehicleType || "",
          totalKms: data.totalKms || "",
          totalExpense: data.totalExpense || "",
          gstType: data.gstType || "",
        });
      } catch (error) {
        console.error("Error fetching reimbursement data:", error);
      }
    };

    fetchReimbursement();
  }, [id]);

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
      case "2 Wheeler":
        ratePerKm = 3;
        break;
      case "4 CNG":
        ratePerKm = 6;
        break;
      case "4 Petrol/Diesel":
        ratePerKm = 8;
        break;
      default:
        ratePerKm = 0;
    }
    return km * ratePerKm;
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleFileDelete = (index) => {
    const newProofs = formData.proofs.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      proofs: newProofs,
    });
  };

  const handleNewFileDelete = (index) => {
    setNewFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
      data.append("totalExpense", formData.totalExpense);
      data.append("gstType", formData.gstType); 

      newFiles.forEach((file) => {
        data.append("proofs", file);
      });

      formData.proofs.forEach((proof) => {
        data.append("existingProofs", proof);
      });

      if (formData.expenseType === "fuel") {
        data.append("vehicleType", formData.vehicleType);
        data.append("totalKms", formData.totalKms);
      }

      const response = await axios.put(
        `http://localhost:8001/reimbursements/${id}`,
        data
      );
      console.log(response.data);
      alert("Form updated successfully!");
      navigate("/homee/viewreimbe");
    } catch (error) {
      console.error("Error updating form data:", error);
      alert("Error updating form. Please try again.");
    }
  };

  const getObjectURL = (file) => {
    if (file instanceof Blob) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  return (
    <div className="containerre mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="cardre">
            <div className="cardre-header text-center bg-orange text-white">
              <h2>UPDATE REIMBURSEMENT FORM</h2>
            </div>
            <div className="cardre-body">
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
                    <option value="food">Food</option>
                    <option value="accomodation">Accomodation</option>
                    <option value="no-bill-claim">No Bill Claim</option>
                    <option value="stamp-paper">Stamp Paper</option>
                    <option value="travelling-transportation">
                      Travelling/Transportation
                    </option>
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
                        <option value="4 CNG">
                          4 Wheeler (CNG) (6/- per Km)
                        </option>
                        <option value="4 Petrol/Diesel">
                          4 Wheeler (Petrol/Diesel) (8/- per Km)
                        </option>
                        <option value="2 Wheeler">
                          2 Wheeler (3/- per Km)
                        </option>
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
                  </>
                )}

                <div className="form-group mb-4">
                  <label htmlFor="totalExpense" className="form-label">
                    Total Expense:
                  </label>
                  <input
                    type="number"
                    id="totalExpense"
                    name="totalExpense"
                    value={formData.totalExpense}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="description" className="form-label">
                    Description:
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="form-label" style={{ display: "block" }}>
                    GST Type:
                  </label>
                  <div className="d-flex align-items-center">
                    <div className="form-check mr-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gstType"
                        id="with-gst"
                        value="With GST"
                        checked={formData.gstType === "With GST"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="with-gst">
                        With GST
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gstType"
                        id="non-gst"
                        value="Non-GST"
                        checked={formData.gstType === "Non-GST"}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="non-gst">
                        Non-GST
                      </label>
                    </div>
                  </div>
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
                  <button type="submit" className="btnre btnre-primary">
                    Update
                  </button>
                </div>
              </form>
              {formData.proofs.length > 0 && (
                <div className="mt-4">
                  <h4>Uploaded Files:</h4>
                  <ul>
                    {formData.proofs.map((proof, index) => (
                      <li
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <a
                          href={`http://localhost:8001/${proof}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Proof {index + 1}
                        </a>
                        <button
                          type="button"
                          className="btnre btnre-danger btnre-sm ml-2 mt-1 mb-1"
                          onClick={() => handleFileDelete(index)}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {newFiles.length > 0 && (
                <div className="mt-4">
                  <h4>Newly Added Files:</h4>
                  <ul>
                    {newFiles.map((file, index) => (
                      <li
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <a
                          href={getObjectURL(file)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View File {index + 1}
                        </a>
                        <button
                          type="button"
                          className="btnre btnre-danger btnre-sm ml-2 mt-1 mb-1"
                          onClick={() => handleNewFileDelete(index)}
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

export default EditReimb;
