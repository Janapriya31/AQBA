import React, { useState } from 'react';

function Settings() {
  const [setting1, setSetting1] = useState(false); // Feature 1
  const [setting2, setSetting2] = useState(true);  // Feature 2
  const [language, setLanguage] = useState('English'); // Language preference
  const [notificationMethod, setNotificationMethod] = useState('email'); // Notification method

  const handleSaveChanges = () => {
    // Implement save changes logic here
    console.log('Settings saved:', { setting1, setting2, language, notificationMethod });
  };

  const handleResetToDefault = () => {
    // Reset to default settings
    setSetting1(false);
    setSetting2(true);
    setLanguage('English');
    setNotificationMethod('email');
    console.log('Settings reset to default');
  };

  return (
    <div>
      <h2 className="centered-heading">Settings</h2>
      <p>Configure system settings and preferences here.</p>

      {/* Configuration Options */}
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={setting1}
            onChange={() => setSetting1(!setting1)}
          />
          Enable Feature 1
        </label>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={setting2}
            onChange={() => setSetting2(!setting2)}
          />
          Enable Feature 2
        </label>
      </div>

      {/* Language Selection */}
      <div className="form-group">
        <label htmlFor="language">Select Language:</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
        </select>
      </div>

      {/* Notification Method Selection */}
      <div className="form-group">
        <label htmlFor="notification-method">Notification Method:</label>
        <select
          id="notification-method"
          value={notificationMethod}
          onChange={(e) => setNotificationMethod(e.target.value)}
        >
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="push">Push Notification</option>
        </select>
      </div>

      {/* Save Changes Button */}
      <button onClick={handleSaveChanges}>Save Changes</button>

      {/* Reset to Default Button */}
      <button onClick={handleResetToDefault} style={{ marginLeft: '10px' }}>
        Reset to Default
      </button>
    </div>
  );
}

export default Settings;
