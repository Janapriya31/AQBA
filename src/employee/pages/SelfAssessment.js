import React, { useState } from 'react';

const SelfAssessment = () => {
  // Sample data for requested question banks
  const [questionBanks, setQuestionBanks] = useState([
    { id: 1, name: 'React Assessment', status: 'Completed', excelLink: '#', pdfLink: '#' },
    { id: 2, name: 'Node.js Fundamentals', status: 'Not Completed', excelLink: '#', pdfLink: '#' },
    { id: 3, name: 'Python for Data Science', status: 'In Progress', excelLink: '#', pdfLink: '#' },
  ]);

  return (
    <div className="self-assessment-container">
      <h2 className="centered-heading">Self-Assessment</h2>
      <p>Access and complete self-assessment using generated question banks.</p>
      <div className="question-bank-list">
        {questionBanks.map((bank) => (
          <div key={bank.id} className="question-bank-item">
            <h3>{bank.name}</h3>
            <p>Status: <strong>{bank.status}</strong></p>
            <div className="download-buttons">
              <button
                className="download-button"
                onClick={() => window.open(bank.excelLink, '_blank')}
              >
                Download Excel
              </button>
              <button
                className="download-button"
                onClick={() => window.open(bank.pdfLink, '_blank')}
              >
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelfAssessment;
