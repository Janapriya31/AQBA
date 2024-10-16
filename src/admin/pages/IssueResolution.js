import React, { useState } from 'react';

function IssueResolution() {
  const [issues, setIssues] = useState([
    { id: 1, title: 'Login issue', details: 'Users cannot log in.', status: 'Open' },
    { id: 2, title: 'Payment failure', details: 'Payment gateway is not responding.', status: 'In Progress' },
  ]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [comment, setComment] = useState('');

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
  };

  const handleAssignToSupport = () => {
    // Logic to assign the issue to support
    console.log(`Issue "${selectedIssue.title}" assigned to support.`);
  };

  const handleAddComment = () => {
    // Logic to add comment
    console.log(`Comment added: ${comment}`);
    setComment('');
  };

  return (
    <div>
      {/* Updated heading here */}
      <h2 className="centered-heading">Issue Resolution</h2>
      <p>View and address reported issues.</p>

      {/* Issue List */}
      <h3>Reported Issues</h3>
      <ul>
        {issues.map(issue => (
          <li key={issue.id} onClick={() => handleIssueClick(issue)} style={{ cursor: 'pointer', marginBottom: '10px' }}>
            {issue.title} - <strong>{issue.status}</strong>
          </li>
        ))}
      </ul>

      {/* Issue Details */}
      {selectedIssue && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc' }}>
          <h4>Issue Details</h4>
          <p><strong>Title:</strong> {selectedIssue.title}</p>
          <p><strong>Details:</strong> {selectedIssue.details}</p>
          <p><strong>Status:</strong> {selectedIssue.status}</p>
          <button onClick={handleAssignToSupport}>Assign to Support</button>
        </div>
      )}

      {/* Comment Section */}
      <div style={{ marginTop: '20px' }}>
        <h4>Comments</h4>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          placeholder="Add your comment here..."
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={handleAddComment} style={{ marginTop: '10px' }}>Add Comment</button>
      </div>
    </div>
  );
}

export default IssueResolution;
