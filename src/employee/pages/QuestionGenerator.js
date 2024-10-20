import React, { useState } from 'react';
import axios from 'axios';

const QuestionGenerator = () => {
    const [topic, setTopic] = useState('');
    const [questions, setQuestions] = useState([]);

    const handleGenerate = async () => {
        try {
            const response = await axios.post('/api/questionbank/generate', { topic });
            setQuestions(response.data.questions);
        } catch (error) {
            console.error('Error generating questions:', error);
        }
    };

    return (
        <div>
            <h1>Question Generator</h1>
            <input 
                type="text" 
                value={topic} 
                onChange={(e) => setTopic(e.target.value)} 
                placeholder="Enter topic" 
            />
            <button onClick={handleGenerate}>Generate Questions</button>
            <ul>
                {questions.map((question, index) => (
                    <li key={index}>{question}</li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionGenerator;
