// src/trainer/FeedbackPage.js
import React, { useState } from 'react';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    // Logic to handle feedback submission
    alert('Feedback submitted!');
    setFeedback(''); // Clear feedback after submission
  };

  return (
    <div>
      <h1 className="centered-heading">Provide Feedback</h1>
      <p>Provide feedback on the generated questions.</p>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Your feedback"
        rows="5"
        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button onClick={handleSubmit} style={{ marginTop: '10px' }}>Submit</button>
    </div>
  );
};

export default FeedbackPage;
