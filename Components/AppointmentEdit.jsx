import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AppointmentEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ patient_id: '', doctor_id: '', date: '' });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch appointment data
    fetch(`http://localhost:5000/api/appointments/${id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Appointment not found');
      }
      return res.json();
    })
    .then(data => setFormData(data))
    .catch(err => {
      console.error(err);
      alert("Appointment not found");
      navigate('/appointments');
    });

    // Fetch patient and doctor lists
    fetch('http://localhost:5000/api/patients')
      .then(res => res.json())
      .then(data => setPatients(data));

    fetch('http://localhost:5000/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/appointments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(() => {
      alert("Appointment updated!");
      navigate('/appointments');
    });
  };
  

  return (
    <div className="container">
      <h3 className="mt-3">Edit Appointment</h3>
      <form onSubmit={handleSubmit}>
        <select
          className="form-control mb-2"
          value={formData.patient_id}
          onChange={e => setFormData({ ...formData, patient_id: parseInt(e.target.value) })}
          required
        >
          <option value="">Select Patient</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <select
          className="form-control mb-2"
          value={formData.doctor_id}
          onChange={e => setFormData({ ...formData, doctor_id: parseInt(e.target.value) })}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        <input
          type="date"
          className="form-control mb-3"
          value={formData.date}
          onChange={e => setFormData({ ...formData, date: e.target.value })}
          required
        />

        <button className="btn btn-primary">Update Appointment</button>
      </form>
    </div>
  );
}

export default AppointmentEdit;
