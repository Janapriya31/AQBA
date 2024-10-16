import React, { useState } from 'react';

const RequestLearningPlan = () => {
  const [technology, setTechnology] = useState('');
  const [areasOfImprovement, setAreasOfImprovement] = useState('');
  const [learningGoals, setLearningGoals] = useState('');

  const handleRequest = () => {
    console.log('Learning plan requested for:', { technology, areasOfImprovement, learningGoals });
    // Implement request logic here
  };

  return (
    <div>
      <h2 className="centered-heading">Request Learning Plan</h2>
      <p>Request a personalized learning plan for technical upskilling.</p>
      <div className="form-group">
        <label>Technology:</label>
        <input
          type="text"
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
          placeholder="Enter technology"
        />
      </div>
      <div className="form-group">
        <label>Areas of Improvement:</label>
        <input
          type="text"
          value={areasOfImprovement}
          onChange={(e) => setAreasOfImprovement(e.target.value)}
          placeholder="Enter areas of improvement"
        />
      </div>
      <div className="form-group">
        <label>Learning Goals:</label>
        <input
          type="text"
          value={learningGoals}
          onChange={(e) => setLearningGoals(e.target.value)}
          placeholder="Enter learning goals"
        />
      </div>
      <button onClick={handleRequest}>Submit</button>
    </div>
  );
};

export default RequestLearningPlan;
