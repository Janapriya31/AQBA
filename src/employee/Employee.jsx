  // src/Components/Assests/employee/Employee.jsx
  import React from 'react';
  import { Route, Routes, Link } from 'react-router-dom';
  import DashBoard from './pages/DashBoard';
  import RequestQuestionBank from './pages/RequestQuestionBank';
  import SelfAssessment from './pages/SelfAssessment';
  import SubmitFeedback from './pages/SubmitFeedback';
  import LearningDevelopment from './pages/LearningDevelopment';
  import RequestLearningPlan from './pages/RequestLearningPlan';
  import Logout from './pages/Logout';

  const Employee = () => {
    return (
      <div className="admin">
      <div className="dashboard-container">
        {/* Sidebar */}
        <nav className="dashboard-sidebar">
          <ul>
            <li><Link to="dashboard">Dashboard</Link></li>
            <li><Link to="request-question-bank">Request Question Bank</Link></li>
            <li><Link to="self-assessment">Self Assessment</Link></li>
            <li><Link to="submit-feedback">Submit Feedback</Link></li>
            <li><Link to="learning-development">Learning Development</Link></li>
            <li><Link to="request-learning-plan">Request Learning Plan</Link></li>
            <li><Link to="logout">Logout</Link></li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="dashboard-content">
          <Routes>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="request-question-bank" element={<RequestQuestionBank />} />
            <Route path="self-assessment" element={<SelfAssessment />} />
            <Route path="submit-feedback" element={<SubmitFeedback />} />
            <Route path="learning-development" element={<LearningDevelopment />} />
            <Route path="request-learning-plan" element={<RequestLearningPlan />} />
            <Route path="logout" element={<Logout />} />
          </Routes>
        </main>
      </div>
      </div>
    );
  };

  export default Employee;