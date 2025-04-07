import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function DoctorEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", specialty: "" });

  // Fetch doctor data on mount
  useEffect(() => {
    fetch(`https://hospital-api-med5.onrender.com/api/doctors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          navigate("/doctors");
        } else {
            
            setFormData(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching doctor:", err);
        alert("Failed to fetch doctor");
      });
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://hospital-api-med5.onrender.com/api/doctors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        alert("Doctor updated!");
        navigate("/doctors");
      })
      .catch((err) => {
        console.error("Error updating doctor:", err);
        alert("Failed to update doctor");
      });
  };

  return (
    <div className="container">
      <h2>Edit Doctor</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Doctor Name"
        />
        <input
          className="form-control my-2"
          value={formData.specialty}
          onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
          placeholder="Specialty"
        />
        <button className="btn btn-success">Update Doctor</button>
      </form>
    </div>
  );
}

export default DoctorEdit;
