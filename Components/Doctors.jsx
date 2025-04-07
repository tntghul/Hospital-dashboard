import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({ name: "", specialty: "" });

  // Fetch doctors
  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  // Add doctor
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newDoctor) => {
        alert("Doctor added successfully");
        setDoctors([...doctors, newDoctor]);
        setFormData({ name: "", specialty: "" }); // reset form
      });
  };

  // Delete doctor
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      fetch(`http://localhost:5000/api/doctors/${id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          setDoctors(doctors.filter((d) => d.id !== id));
        } else {
          alert("Failed to delete");
        }
      });
    }
    
  };

  return (
    <div className="container">
      <h2 className="mt-3">Add Doctor</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Doctor Name"
          required
        />
        <input
          className="form-control my-2"
          value={formData.specialty}
          onChange={(e) =>
            setFormData({ ...formData, specialty: e.target.value })
          }
          placeholder="Specialty"
          required
        />
        <button className="btn btn-success mb-3">Add Doctor</button>
      </form>

      <h2 className="m-5 text-center">Doctors List</h2>
      <table className="table shadow">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Specialty</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d,index) => (
            <tr key={d.id}>
                <td>{index + 1}</td>
                <td>{d.name}</td>
                <td>{d.specialty}</td>
              <td className="text-center">
              <Link to={`/doctors/${d.id}`} className=" mx-3">
                <i className="bi bi-eye text-primary"></i>
                </Link>
                <Link to={`/doctoredit/${d.id}`}>
                  <i className="bi bi-pencil-square text-warning mx-3"></i>
                </Link>
                <i
                  className="bi bi-trash3 text-danger mx-3"
                  onClick={() => handleDelete(d.id)}
                  role="button"
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Doctors;
