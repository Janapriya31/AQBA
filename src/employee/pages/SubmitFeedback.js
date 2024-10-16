import React, { useState } from 'react';

const SubmitFeedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Feedback submitted:', feedback);
    setFeedback('');
  };

  return (
    <div>
      <h2 className="centered-heading">Submit Feedback</h2>
      <p>Provide feedback on the generated question banks.</p>
      <textarea 
        value={feedback}
        onChange={handleFeedbackChange}
        placeholder="Enter your feedback here..."
        rows="4"
        style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SubmitFeedback;
