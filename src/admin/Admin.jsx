import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './Admin.css';
import UserManagement from './pages/UserManagement';
import SystemMonitoring from './pages/SystemMonitoring';
import ReportGeneration from './pages/ReportGeneration';
import Settings from './pages/Settings';
import IssueResolution from './pages/IssueResolution';
import Logout from './pages/Logout';
import DashBoard from './pages/Dashboard'; // Ensure this path is correct

function Admin() {
  return (
    <div className="admin">
      <div className="dashboard-container">
        {/* Sidebar */}
        <nav className="dashboard-sidebar">
          <ul>
            <li><Link to="dashboard">Dashboard</Link></li> {/* Updated path */}
            <li><Link to="user-management">User Management</Link></li> {/* Updated path */}
            <li><Link to="system-monitoring">System Monitoring</Link></li> {/* Updated path */}
            <li><Link to="report-generation">Report Generation</Link></li> {/* Updated path */}
            <li><Link to="settings">Settings</Link></li> {/* Updated path */}
            <li><Link to="issue-resolution">Issue Resolution</Link></li> {/* Updated path */}
            <li><Link to="logout">Logout</Link></li> {/* Updated path */}
          </ul>
        </nav>

        {/* Main Content */}
        <main className="dashboard-content">
          <Routes>
            <Route path="dashboard" element={<DashBoard />} /> {/* Updated path */}
            <Route path="user-management" element={<UserManagement />} /> {/* Updated path */}
            <Route path="system-monitoring" element={<SystemMonitoring />} /> {/* Updated path */}
            <Route path="report-generation" element={<ReportGeneration />} /> {/* Updated path */}
            <Route path="settings" element={<Settings />} /> {/* Updated path */}
            <Route path="issue-resolution" element={<IssueResolution />} /> {/* Updated path */}
            <Route path="logout" element={<Logout />} /> {/* Updated path */}
          </Routes>
        </main>
      </div>
      </div>  
  );
}

export default Admin;
