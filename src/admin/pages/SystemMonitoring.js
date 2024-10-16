import React, { useState, useEffect } from 'react';

function SystemMonitoring() {
  // Sample data for real-time performance and logs (you may replace it with actual data)
  const [performanceMetrics, setPerformanceMetrics] = useState({
    cpuUsage: 45,
    memoryUsage: 72,
    networkLatency: 120,
  });
  
  const [serverStatus, setServerStatus] = useState('Online');
  const [errorLogs, setErrorLogs] = useState([
    { id: 1, message: 'Error: Connection timeout at 14:32' },
    { id: 2, message: 'Warning: High memory usage at 14:45' },
  ]);

  const [userActivityLogs, setUserActivityLogs] = useState([
    { id: 1, activity: 'User A logged in at 14:30' },
    { id: 2, activity: 'User B updated settings at 14:40' },
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, alert: 'New update available' },
    { id: 2, alert: 'Scheduled maintenance at 16:00' },
  ]);

  // You can implement logic here to fetch real-time data and update state

  useEffect(() => {
    // Simulate real-time metrics update (for demonstration)
    const interval = setInterval(() => {
      setPerformanceMetrics((prev) => ({
        ...prev,
        cpuUsage: Math.floor(Math.random() * 100),
        memoryUsage: Math.floor(Math.random() * 100),
        networkLatency: Math.floor(Math.random() * 200),
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="centered-heading">System Monitoring</h2>

      <p>Monitor system performance and logs here.</p>

      {/* Real-time performance metrics */}
      <div className="stat-card">
        <h3>Real-time Performance Metrics</h3>
        <p>CPU Usage: {performanceMetrics.cpuUsage}%</p>
        <p>Memory Usage: {performanceMetrics.memoryUsage}%</p>
        <p>Network Latency: {performanceMetrics.networkLatency} ms</p>
      </div>

      {/* Server Status */}
      <div className="stat-card">
        <h3>Server Status</h3>
        <p>Status: {serverStatus}</p>
      </div>

      {/* Error Logs */}
      <div className="stat-card">
        <h3>Error Logs</h3>
        <ul>
          {errorLogs.map((log) => (
            <li key={log.id}>{log.message}</li>
          ))}
        </ul>
      </div>

      {/* User Activity Logs */}
      <div className="stat-card">
        <h3>User Activity Logs</h3>
        <ul>
          {userActivityLogs.map((log) => (
            <li key={log.id}>{log.activity}</li>
          ))}
        </ul>
      </div>

      {/* Alerts and Notifications */}
      <div className="stat-card">
        <h3>Alerts & Notifications</h3>
        <ul>
          {alerts.map((alert) => (
            <li key={alert.id}>{alert.alert}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SystemMonitoring;
