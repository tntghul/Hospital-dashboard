import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PatientEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", age: "", gender: "" });

  useEffect(() => {
    fetch(`https://hospital-api-med5.onrender.com/api/patients/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.gender) {
      alert("Please fill all fields");
      return;
    }

    fetch(`https://hospital-api-med5.onrender.com/api/patients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        alert("Patients updated!");
        navigate("/patients");
      })
      .catch((err) => alert("Something went wrong!"));
  };

  if (!formData.name && !formData.age && !formData.gender) {
    return <p className="container mt-4">Loading...</p>;
  }

  return (
    <div className="container">
      <h2 className="my-3">Edit Patient</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
        />
        <input
          className="form-control my-2"
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          placeholder="Age"
        />
        <select
          className="form-control my-2"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        
        <button className="btn btn-success">Update Patient</button>
      </form>
    </div>
  );
}

export default PatientEdit;
