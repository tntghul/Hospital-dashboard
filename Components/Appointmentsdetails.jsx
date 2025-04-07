import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Appointmentsdetails() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/appointments/${id}`)
      .then(res => res.json())
      .then(data => setAppointment(data)) // ✅ Fixed
      .catch(err => console.error("Error fetching appointment:", err));

    // Also fetch patients and doctors
    fetch('http://localhost:5000/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data));

    fetch('http://localhost:5000/api/patients')
      .then(res => res.json())
      .then(data => setPatients(data));
  }, [id]);

  const getDoctorName = (id) => {
    const doc = doctors.find(d => String(d.id) === String(id));
    return doc ? doc.name : 'Unknown Doctor';
  };

  const getPatientName = (id) => {
    const pat = patients.find(p => String(p.id) === String(id));
    return pat ? pat.name : 'Unknown Patient';
  };

  if (!appointment) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Appointment Details</h2>

      <table className="table table-bordered shadow-sm">
        <tbody>
          <tr>
            <th scope="row">Patient Name</th>
            <td>{getPatientName(appointment.patient_id)}</td>
          </tr>
          <tr>
            <th scope="row">Doctor Name</th>
            <td>{getDoctorName(appointment.doctor_id)}</td>
          </tr>
          <tr>
            <th scope="row">Date</th>
            <td>{appointment.date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Appointmentsdetails;
