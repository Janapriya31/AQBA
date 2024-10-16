// src/trainer/UploadCurriculum.js
import React, { useState } from 'react';

const UploadCurriculum = () => {
  const [technology, setTechnology] = useState('');
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('Not Uploaded');

  const handleUpload = () => {
    // Logic for uploading curriculum
    setUploadStatus('Uploading...');
    setTimeout(() => {
      setUploadStatus('Upload Successful!');
    }, 2000);
  };

  return (
    <div>
      <h1 className="centered-heading">Upload Curriculum</h1>
      <p>Upload curriculum files for question bank generation.</p>
      
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

      {/* File Upload Button */}
      <div className="form-group">
        <label>Upload File (CSV, Excel):</label>
        <input type="file" accept=".csv, .xlsx" onChange={(e) => setFile(e.target.files[0])} />
      </div>

      {/* Upload Button */}
      <button onClick={handleUpload}>Upload</button>

      {/* Upload Status Indicator */}
      <p>Status: {uploadStatus}</p>
    </div>
  );
};

export default UploadCurriculum;
