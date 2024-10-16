import React, { useState } from 'react';

const RequestQuestionBank = () => {
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [message, setMessage] = useState('');

  const technologies = [
    'React',
    'Node.js',
    'Python',
    'Java',
    'Data Science',
    'Machine Learning',
    'SQL',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTechnology) {
      setMessage(`Question bank for ${selectedTechnology} requested successfully!`);
      // Perform additional logic for requesting question bank
    } else {
      setMessage('Please select a technology.');
    }
  };

  return (
    <div className="request-question-bank-container">
      <h2 className="centered-heading">Request a Question Bank</h2>
      <p>Request a customized question bank for self-assessment.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="technology-select">Select Technology:</label>
        <select
          id="technology-select"
          value={selectedTechnology}
          onChange={(e) => setSelectedTechnology(e.target.value)}
        >
          <option value="">-- Choose a technology --</option>
          {technologies.map((tech, index) => (
            <option key={index} value={tech}>
              {tech}
            </option>
          ))}
        </select>
        <button type="submit" className="request-button">
          Request Question Bank
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RequestQuestionBank;
