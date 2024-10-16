// src/trainer/ReviewQuestionBank.js
import React, { useState } from 'react';

const ReviewQuestionBank = () => {
  const [questions, setQuestions] = useState([
    { id: 1, text: 'Sample Question 1' },
    { id: 2, text: 'Sample Question 2' },
    // Add more sample questions as needed
  ]);

  const handleEdit = (id) => {
    // Logic to edit question
    alert(`Editing question ${id}`);
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleAdd = () => {
    const newQuestionText = prompt('Enter the new question:');
    if (newQuestionText) {
      const newQuestion = {
        id: questions.length + 1, // Simple ID generation
        text: newQuestionText,
      };
      setQuestions([...questions, newQuestion]);
    }
  };

  return (
    <div>
      <h1 className="centered-heading">Review and Edit Question Bank</h1>
      <p>Review and modify the generated question bank.</p>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            {q.text}
            <button onClick={() => handleEdit(q.id)}>Edit</button>
            <button onClick={() => handleDelete(q.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAdd}>Add Question</button>
      <button>Save Changes</button>
    </div>
  );
};

export default ReviewQuestionBank;
