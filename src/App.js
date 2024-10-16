import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './mainpage/MainPage';
import './admin/Admin.css';
import Register from './register/Register'
import AdminLogin from './admin/pages/AdminLogin';
import EmployeeLogin from './employee/pages/EmployeeLogin';
import TrainerLogin from './trainer/pages/TrainerLogin';

// Importing Admin Pages
import Admin from './admin/Admin';

// Importing Employee Pages
import Employee from './employee/Employee';

// Importing Trainer Pages
import Trainer from './trainer/Trainer'

function App() {
  return (
    <Router>
        <Routes>
          {/* Main Route */}
          <Route path="/" element={<MainPage />} />

          <Route path="/register/*" element={<Register />} />
          {/* Login Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/trainer/login" element={<TrainerLogin />} />

          {/* Admin Route */}
          <Route path="/admin/*" element={<Admin />} />

          {/* Employee Routes */}
          <Route path="/employee/*" element={<Employee />} />
          
          {/* Trainer Routes */}
          <Route path="/trainer/*" element={<Trainer />} />
        </Routes>
    </Router>
  );
}

export default App;
