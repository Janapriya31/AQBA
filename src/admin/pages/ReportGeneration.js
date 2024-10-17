import React, { useState } from 'react';// Assuming you have a separate CSS file

function ReportGeneration() {
  const [reportType, setReportType] = useState('usage-statistics');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleGenerateReport = () => {
    console.log(`Generating ${reportType} report from ${startDate} to ${endDate}`);
  };

  const handleExport = (format) => {
    console.log(`Exporting report in ${format} format`);
  };

  return (
    <div>
      <h2 className="centered-heading">Report Generation</h2>
      <p>Generate and download various system reports.</p>

      {/* Report Type Selection */}
      <div className="form-group">
        <span className="white-label">Select Report Type:</span>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="usage-statistics">Usage Statistics</option>
          <option value="questionbank-generation-summaries">Question Bank Generation Summaries</option>
          <option value="system-health-reports">System Health Reports</option>
        </select>
      </div>

      {/* Date Range Selection */}
      <div className="form-group">
        <span className="white-label">Start Date:</span>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="form-group">
        <span className="white-label">End Date:</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Generate Report Button */}
      <button onClick={handleGenerateReport}>Generate Report</button>

      {/* Export Options */}
      <div className="export-options">
        <h3>Export Options:</h3>
        <button onClick={() => handleExport('Excel')}>Export as Excel</button>
        <button onClick={() => handleExport('PDF')}>Export as PDF</button>
      </div>
    </div>
  );
}

export default ReportGeneration;
