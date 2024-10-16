// src/trainer/DownloadQuestionBank.js
import React, { useState } from 'react';

const DownloadQuestionBank = () => {
  const [format, setFormat] = useState('');

  const handleDownload = () => {
    // Logic for downloading question bank
    alert(`Downloading question bank in ${format} format.`);
  };

  return (
    <div>
      <h1 className="centered-heading">Download Question Bank</h1>
      <p>Download the finalized question bank.</p>
      <label htmlFor="format">Select Format:</label>
      <select id="format" onChange={(e) => setFormat(e.target.value)}>
        <option value="">Select Format</option>
        <option value="Excel">Excel</option>
        <option value="PDF">PDF</option>
      </select>
      <button onClick={handleDownload} disabled={!format}>Download</button>
    </div>
  );
};

export default DownloadQuestionBank;
