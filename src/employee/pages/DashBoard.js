// src/pages/EmployeeDashboard.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import your CSS file for styles

const EmployeeDashboard = () => {
  return (
    <div>
      <h2 className="centered-heading">Employee Dashboard</h2>
      <p>Overview of employee-specific functionalities and quick access.</p>
      <div className="quick-links">
        <h3>Quick Links</h3>
        <ul>
          <li><Link to="/employee/request-question-bank">Request Question Bank</Link></li>
          <li><Link to="/employee/self-assessment">Self Assessment</Link></li>
          <li><Link to="/employee/submit-feedback">Submit Feedback</Link></li>
          <li><Link to="/employee/learning-development">Learning  Development</Link></li>
          <li><Link to="/employee/request-learning-plan">Request Learning Plan</Link></li>
          <li><Link to="/employee/logout">Logout</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
