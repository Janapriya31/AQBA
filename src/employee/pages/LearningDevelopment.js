import React, { useState } from 'react';

const LearningDevelopment = () => {
  // Sample data for learning resources
  const [resources, setResources] = useState([
    { id: 1, name: 'React Basics', progress: 70, link: 'https://reactjs.org/' },
    { id: 2, name: 'Node.js Fundamentals', progress: 50, link: 'https://nodejs.org/' },
    { id: 3, name: 'Python for Data Science', progress: 30, link: 'https://www.python.org/' },
  ]);

  return (
    <div className="learning-development-container">
      <h2 className="centered-heading">Learning and Development</h2>
      <p>Access learning materials and track your progress on each topic.</p>
      <div className="resource-list">
        {resources.map((resource) => (
          <div key={resource.id} className="resource-item">
            <h3>{resource.name}</h3>
            <div className="progress-bar-container">
              <div  
                className="progress-bar"
                style={{ width: `${resource.progress}%` }}
              >
                {resource.progress}%
              </div>
            </div>
            <button
              className="access-button"
              onClick={() => window.open(resource.link, '_blank')}
            >
              Access
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningDevelopment;
