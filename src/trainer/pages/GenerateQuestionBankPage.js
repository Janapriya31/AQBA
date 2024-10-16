// src/trainer/GenerateQuestionBank.js
import React, { useState } from 'react';

const GenerateQuestionBank = () => {
  const [technology, setTechnology] = useState('');
  const [topics, setTopics] = useState('');
  const [numQuestions, setNumQuestions] = useState(0);
  const [difficulty, setDifficulty] = useState(1);

  const handleGenerate = () => {
    // Logic to generate question bank
    alert('Question bank generated!');
  };

  return (
    <div>
      <h1 className="centered-heading">Generate Question Bank</h1>
      <p>Specify parameters for generating a question bank.</p>
      
      {/* Technology Selection Dropdown */}
      <div className="form-group">
        <label>Select Technology:</label>
        <select onChange={(e) => setTechnology(e.target.value)} value={technology}>
          <option value="">Select Technology</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Topic Selection Input */}
      <div className="form-group">
        <label>Topics:</label>
        <input
          type="text"
          placeholder="Enter topics (comma-separated)"
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
        />
      </div>

      {/* Number of Questions Input */}
      <div className="form-group">
        <label>Number of Questions:</label>
        <input
          type="number"
          placeholder="Enter number of questions"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          min="1"
        />
      </div>

      {/* Difficulty Level Slider */}
      <div className="form-group">
        <label>Difficulty Level (1 to 5):</label>
        <input
          type="range"
          min="1"
          max="5"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        />
        <p>Current Difficulty: {difficulty}</p>
      </div>

      {/* Generate Button */}
      <button onClick={handleGenerate}>Generate</button>
    </div>
  );
};

export default GenerateQuestionBank;
