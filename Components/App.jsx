import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Patients from './Patients';
import Doctors from './Doctors';
import Appointments from './Appointments';
import PatientEdit from './PatientEdit'
import DoctorEdit from './DoctorEdit'
import AppointmentEdit from './AppointmentEdit'
import Patientdetails from './Patientdetails';
import Doctordetails from './Doctordetails';
import Appointmentsdetails from './Appointmentsdetails';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h2 className="text-center mb-4">🏥 Hospital Dashboard</h2>
        <nav className="mb-4">
          <Link className="btn btn-outline-primary mx-2" to="/">Dashboard</Link>
          <Link className="btn btn-outline-primary mx-2" to="/patients">Patients</Link>
          <Link className="btn btn-outline-primary mx-2" to="/doctors">Doctors</Link>
          <Link className="btn btn-outline-primary mx-2" to="/appointments">Appointments</Link>
          
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/patientedit/:id" element={<PatientEdit />} />
          <Route path="/doctoredit/:id" element={<DoctorEdit />} />
          <Route path="/appointmentedit/:id" element={<AppointmentEdit />} />
          <Route path="/patients/:id" element={<Patientdetails />} />
          <Route path="/doctors/:id" element={<Doctordetails />} />
          <Route path="/appointments/:id" element={<Appointmentsdetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
