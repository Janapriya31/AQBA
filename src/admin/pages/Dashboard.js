// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to import the CSS file
function Dashboard() {
  return (
    <div style={{ marginTop: '50px' }}>
      <h2 className="centered-heading">Welcome to the Admin Dashboard</h2>
      <p>Overview of system statistics and quick access to main functionalities.</p>

      {/* Quick Links */}
      <div className="quick-links">
        <h3>Quick Links</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><Link to="/admin/user-management">User Management</Link></li>
          <li><Link to="/admin/report-generation">Reports</Link></li>
          <li><Link to="/admin/settings">Settings</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
