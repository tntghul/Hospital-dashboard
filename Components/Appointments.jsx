import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({ patient_id: '', doctor_id: '', date: '' });

  // Fetch data on load
  useEffect(() => {
    fetch('https://hospital-api-med5.onrender.com/api/appointments')
      .then(res => res.json())
      .then(data => setAppointments(data));

    fetch('https://hospital-api-med5.onrender.com/api/patients')
      .then(res => res.json())
      .then(data => setPatients(data));

    fetch('https://hospital-api-med5.onrender.com/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://hospital-api-med5.onrender.com/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(() => {
        fetch('https://hospital-api-med5.onrender.com/api/appointments')
          .then(res => res.json())
          .then(data => {
            alert("Appointment added successfully");
            setAppointments(data);
            setFormData({ patient_id: '', doctor_id: '', date: '' });
          });
      });
  };

  const getPatientName = (id) => {
    console.log("Looking for patient with id:", id);
    const p = patients.find((pat) => pat.id === Number(id));
    console.log("Found:", p);  // Safer to log the whole object
    return p ? p.name : 'Unknown';  // Use correct key (probably 'name')
  };
  
  const getDoctorName = (id) => {
    console.log("Looking for doctor with id:", id);
    const d = doctors.find((doc) => doc.id === Number(id));
    console.log("Found:", d);
    return d ? d.name : 'Unknown';
  };
  

   // Delete appointments
   const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this appointments?")) {
      fetch(`https://hospital-api-med5.onrender.com/api/appointments/${id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          setAppointments(appointments.filter((d) => d.id !== id));
        } else {
          alert("Failed to delete");
        }
      });
    }
    
  };

  return (
    <div className="container">
      <h3 className="mt-3">Book Appointment</h3>
      <form onSubmit={handleSubmit} className="mb-4">
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
          className="form-control mb-2"
          value={formData.date}
          onChange={e => setFormData({ ...formData, date: e.target.value })}
          required
        />

        <button className="btn btn-primary">Book Appointment</button>
      </form>

      <h3 className='text-center m-5'>Appointments</h3>
      <table className="table shadow">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th className='text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map( (app, index) => (
            <tr key={app.id}>
              <td>{index + 1}</td>
              <td>{getPatientName(app.patient_id)}</td>
              <td>{getDoctorName(app.doctor_id)}</td>
              <td>{app.date}</td>
              <td className='text-center'>
              <Link to={`/appointments/${app.id}`} className="text-primary mx-1">
                <i className='bi bi-eye mx-3'></i>
</Link>
              <Link to={`/appointmentedit/${app.id}`}><i className='bi bi-pencil text-warning'></i></Link>
                <i
                  className="bi bi-trash3 text-danger mx-3"
                  onClick={() => handleDelete(app.id)}
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

export default Appointments;
