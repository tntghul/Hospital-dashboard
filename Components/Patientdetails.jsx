import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PatientDetails() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/patients/${id}`)
      .then(res => res.json())
      .then(data => setPatient(data))
      .catch(err => console.error("Error fetching patient details:", err));
  }, [id]);

  if (!patient) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
  <h2 className="mb-4">Patient Details</h2>

  <table className="table table-bordered shadow-sm">
    <tbody>
      <tr>
        <th scope="row">Name</th>
        <td>{patient.name}</td>
      </tr>
      <tr>
        <th scope="row">Age</th>
        <td>{patient.age}</td>
      </tr>
      <tr>
        <th scope="row">Gender</th>
        <td>{patient.gender}</td>
      </tr>
      
      
      {/* Add more fields here if needed */}
    </tbody>
  </table>
</div>

  );
}

export default PatientDetails;
