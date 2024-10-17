import React, { useState } from 'react'; // Assuming you have a separate CSS file

function Settings() {
  const [setting1, setSetting1] = useState(false);  // Feature 1
  const [setting2, setSetting2] = useState(true);   // Feature 2
  const [darkMode, setDarkMode] = useState(false);  // Dark mode preference
  const [notificationMethod, setNotificationMethod] = useState('email'); // Notification method

  const handleSaveChanges = () => {
    console.log('Settings saved:', { setting1, setting2, darkMode, notificationMethod });
  };

  const handleResetToDefault = () => {
    setSetting1(false);
    setSetting2(true);
    setDarkMode(false);
    setNotificationMethod('email');
    console.log('Settings reset to default');
  };

  return (
    <div className="settings-container">
      <h2 className="centered-heading">System Settings</h2>
      <p>Configure the system preferences below:</p>

      {/* Feature Toggles */}
      <div className="settings-section">
        <h3>Features</h3>
        <div className="form-group">
          <input
            type="checkbox"
            checked={setting1}
            onChange={() => setSetting1(!setting1)}
          />
          <span className="white-label">Enable Feature 1</span>
        </div>

        <div className="form-group">
          <input
            type="checkbox"
            checked={setting2}
            onChange={() => setSetting2(!setting2)}
          />
          <span className="white-label">Enable Feature 2</span>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="settings-section">
        <h3>Appearance</h3>
        <div className="form-group">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="white-label">Enable Dark Mode</span>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="settings-section">
        <h3>Notifications</h3>
        <div className="form-group">
          <span className="white-label">Preferred Notification Method:</span>
          <select
            value={notificationMethod}
            onChange={(e) => setNotificationMethod(e.target.value)}
          >
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="push">Push Notification</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="settings-actions">
        <button onClick={handleSaveChanges}>Save Changes</button>
        <button onClick={handleResetToDefault} style={{ marginLeft: '10px' }}>
          Reset to Default
        </button>
      </div>
    </div>
  );
}

export default Settings;
