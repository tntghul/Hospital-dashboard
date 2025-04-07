import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';

function Dashboard() {
  const [stats, setStats] = useState({ patients: 0, doctors: 0, appointments: 0 });
  const [list, setList] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [searchterm, setSearchterm] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const navigate = useNavigate();

  // Fetch stats
  const fetchStats = () => {
    fetch('https://hospital-api-med5.onrender.com/api/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  };

  // Fetch list (based on tab)
  const fetchList = (type) => {
    fetch(`https://hospital-api-med5.onrender.com/api/${type}`)
      .then(res => res.json())
      .then(data => setList(data));
  };

  // Initial load
  useEffect(() => {
    fetchStats();

    // Doctors
    fetch('https://hospital-api-med5.onrender.com/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data));

    // Patients
    fetch('https://hospital-api-med5.onrender.com/api/patients')
      .then(res => res.json())
      .then(data => setPatients(data));
  }, []);

  const handleCardClick = (type) => {
    setActiveTab(type);
    fetchList(type);
  };

  const getDoctorName = (id) => {
    const doc = doctors.find(d => String(d.id) === String(id));
    return doc ? doc.name : 'Unknown Doctor';
  };

  const getPatientName = (id) => {
    const pat = patients.find(p => String(p.id) === String(id));
    return pat ? pat.name : 'Unknown Patient';
  };

  const filteredList = activeTab ? list.filter((item) => {
    const term = searchterm.toLowerCase();

    if (activeTab === "patients") {
      return (
        item.name?.toLowerCase().includes(term) ||
        item.gender?.toLowerCase().includes(term) ||
        item.hospitality?.toLowerCase().includes(term)
      );
    } else if (activeTab === "doctors") {
      return (
        item.name?.toLowerCase().includes(term) ||
        item.specialty?.toLowerCase().includes(term)
      );
    } else if (activeTab === "appointments") {
      const patientName = getPatientName(item.patient_id)?.toLowerCase();
      const doctorName = getDoctorName(item.doctor_id)?.toLowerCase();
      const date = item.date?.toLowerCase();

      return (
        patientName.includes(term) ||
        doctorName.includes(term) ||
        date.includes(term)
      );
    }

    return false;
  }) : [];

  return (
    <div className="container mt-4">
      {/* STATS CARDS */}
      <div className="row">
        {["patients", "doctors", "appointments"].map((type, index) => {
          const titles = {
            patients: "Total Patients",
            doctors: "Total Doctors",
            appointments: "Appointments"
          };
          const bgClass = ["bg-info", "bg-success", "bg-warning"][index];
          return (
            <div className="col-md-4" key={type} onClick={() => handleCardClick(type)}>
              <div className={`card ${bgClass} text-white mb-3`} style={{ cursor: 'pointer' }}>
                <div className="card-body">
                  <h5>{titles[type]}</h5>
                  <h3>{stats[type]}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DATA SECTION: SEARCH BAR + LIST + BUTTONS */}
      {activeTab && (
        <div className="mt-4">
          {/* SEARCH */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search"
            value={searchterm}
            onChange={(e) => setSearchterm(e.target.value)}
          />

          {/* LIST */}
          
<ul className="list-group">
  {filteredList.map((item, i) => {
    let linkPath = '';
    if (activeTab === 'patients') linkPath = `/patients/${item.id}`;
    if (activeTab === 'doctors') linkPath = `/doctors/${item.id}`;
    if (activeTab === 'appointments') linkPath = `/appointments/${item.id}`;

    return (
      <Link key={i} to={linkPath} className="list-group-item list-group-item-action">
        {activeTab === "patients" &&
          `👤 ${item.name}, Age: ${item.age}, Gender: ${item.gender}`}
        {activeTab === "doctors" &&
          `👨‍⚕️ ${item.name}, Specialty: ${item.specialty}`}
        {activeTab === "appointments" &&
          (doctors.length === 0 || patients.length === 0
            ? "Loading..."
            : `📅 ${getPatientName(item.patient_id)} → ${getDoctorName(item.doctor_id)} on ${item.date}`)}
      </Link>
    );
  })}
</ul>

          {/* NAVIGATION BUTTONS */}
          <div className="mt-4 text-center">
            <button className="btn btn-outline-primary mx-2" onClick={() => navigate('/patients')}>
              ➡️ Go to Patients
            </button>
            <button className="btn btn-outline-success mx-2" onClick={() => navigate('/doctors')}>
              ➡️ Go to Doctors
            </button>
            <button className="btn btn-outline-warning mx-2" onClick={() => navigate('/appointments')}>
              ➡️ Go to Appointments
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
