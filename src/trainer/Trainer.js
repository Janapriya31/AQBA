import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/DashBoard';
import UploadCurriculum from './pages/Curriculum';
import GenerateQuestionBank from './pages/GenerateQuestionBankPage';
import ReviewQuestionBank from './pages/ReviewandEditQuestionBankPage';
import DownloadQuestionBank from './pages/DownloadQuestionBankPage';
import FeedbackPage from './pages/FeedbackPage';
import Logout from './pages/Logout';

function App() {
  return (
    <div className="admin">
      <div className="dashboard-container">
        {/* Sidebar */}
        <nav className="dashboard-sidebar">
          <ul>
            <li><Link to="dashboard">Dashboard</Link></li>
            <li><Link to="upload-curriculum">Upload Curriculum</Link></li>
            <li><Link to="generate-question-bank">Generate Question Bank</Link></li>
            <li><Link to="review-question-bank">Review Question Bank</Link></li>
            <li><Link to="download-question-bank">Download Question Bank</Link></li>
            <li><Link to="feedback">Feedback</Link></li>
            <li><Link to="logout">Logout</Link></li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="dashboard-content">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="upload-curriculum" element={<UploadCurriculum />} />
            <Route path="generate-question-bank" element={<GenerateQuestionBank />} />
            <Route path="review-question-bank" element={<ReviewQuestionBank />} />
            <Route path="download-question-bank" element={<DownloadQuestionBank />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="logout" element={<Logout />} />
          </Routes>
        </main>
      </div>
      </div>
  );
}

export default App;
