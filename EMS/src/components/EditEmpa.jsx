import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import "../styles/EditEmpa.css"; // Import custom CSS for additional styling if needed

function EditEmpa() {
  const { uid } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:8001/employees/${uid}`);
        setEmployee(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmployee();
  }, [uid]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:8001/employees/${uid}`, employee);
      if (res.status === 200) {
        alert("Employee details updated successfully!");
      } else {
        alert("Failed to update employee details.");
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred while updating employee details.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center">
              <h2>Employee Details</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group row mb-3">
                  <label className="col-sm-3 col-form-label">Unique Id:</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" value={employee.uid} readOnly />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-sm-3 col-form-label">Password:</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" value={employee.password} readOnly />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-sm-3 col-form-label">Name:</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" value={employee.name} onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-sm-3 col-form-label">Phone:</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" value={employee.phone} onChange={(e) => setEmployee({ ...employee, phone: e.target.value })} />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-sm-3 col-form-label">Email:</label>
                  <div className="col-sm-9">
                    <input type="email" className="form-control" value={employee.email} onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-sm-3 col-form-label">Department:</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" value={employee.department} onChange={(e) => setEmployee({ ...employee, department: e.target.value })} />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-sm-3 col-form-label">Date of Birth:</label>
                  <div className="col-sm-9">
                    <input type="date" className="form-control" value={employee.dob} onChange={(e) => setEmployee({ ...employee, dob: e.target.value })} />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-sm-3 col-form-label">Joining Date:</label>
                  <div className="col-sm-9">
                    <input type="date" className="form-control" value={employee.joiningDate} onChange={(e) => setEmployee({ ...employee, joiningDate: e.target.value })} />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-sm-3 col-form-label">Salary:</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" value={employee.salary} onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-sm-3 col-form-label">Address:</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" value={employee.address} onChange={(e) => setEmployee({ ...employee, address: e.target.value })} />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-9 offset-sm-3">
                    <button type="button" className="btn btn-primary mt-3" onClick={handleUpdate}>Update</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEmpa;
