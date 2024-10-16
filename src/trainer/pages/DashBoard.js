// src/trainer/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2 className="centered-heading">Trainer Dashboard</h2>
      <p>Overview of trainer-specific functionalities and quick access.</p>

      {/* Quick Links */}
      <div className="quick-links">
        <h3>Quick Links</h3>
        <ul>
          <li><Link to="/trainer/upload-curriculum">Upload Curriculum</Link></li>
          <li><Link to="/trainer/generate-question-bank">Generate Question Bank</Link></li>
          <li><Link to="/trainer/review-question-bank">Review Question Bank</Link></li>
          <li><Link to="/trainer/download-question-bank">Download Question Bank</Link></li>
          <li><Link to="/trainer/notifications">Notifications</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
