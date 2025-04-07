import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Patients() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({ name: '', age: '', gender: '' });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    fetch('https://hospital-api-med5.onrender.com/api/patients')
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error("Fetch error:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.gender) {
      alert("Please fill all fields");
      return;
    }

    fetch('https://hospital-api-med5.onrender.com/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then(() => {
        alert("Patient added successfully!");
      setFormData({ name: '', age: '', gender: '' });
      fetchPatients();
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
  
    fetch(`https://hospital-api-med5.onrender.com/api/patients/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete");
        }
        // Update frontend list without refresh
        setPatients((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((err) => {
        console.error("Error deleting patient:", err);
        alert("Error deleting patient");
      });
  };
  
  return (
    
    <div className="container">
      <h3 className="my-3"> Add Patients </h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" className="form-control mb-2" placeholder="Name" value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })} />
        <input type="number" className="form-control mb-2" placeholder="Age" value={formData.age}
          onChange={e => setFormData({ ...formData, age: e.target.value })} />
        <select className="form-control mb-2" value={formData.gender}
          onChange={e => setFormData({ ...formData, gender: e.target.value })}>
        
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>



        <button className="btn btn-primary">Add Patient</button>
      </form>


        <h1 className='m-5 text-center'>Patient List</h1>
      <table className="table shadow">
       
        <thead ><tr><th>ID</th><th>Name</th><th>Age</th><th>Gender</th><th className='text-center'>Action</th></tr></thead>
        <tbody>
          {patients.map((p,index) => (
            <tr key={p.id}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
              <td className='text-center'>
              <Link to={`/patients/${p.id}`} className="text-primary mx-2">
                <i className='bi bi-eye'></i>
</Link>
              <Link to={`/patientedit/${p.id}`}>
                  <i className="bi bi-pencil-square text-warning mx-3"></i>
                </Link>
              <i className="bi bi-trash3 text-danger mx-3" role="button" onClick={() => handleDelete(p.id)}></i>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Patients;
