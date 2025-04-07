import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Doctordetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetch(`https://hospital-api-med5.onrender.com/api/doctors/${id}`)
      .then(res => res.json())
      .then(data => setDoctor(data))
      .catch(err => console.error("Error fetching doctor details:", err));
  }, [id]);

  if (!doctor) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
  <h2 className="mb-4">Doctor Details</h2>

  <table className="table table-bordered shadow-sm">
    <tbody>
      <tr>
        <th scope="row">Name</th>
        <td>{doctor.name}</td>
      </tr>
      <tr>
        <th scope="row">Speciality</th>
        <td>{doctor.specialty}</td>
      </tr>
 
    </tbody>
  </table>
</div>

  );
}

export default Doctordetails;
