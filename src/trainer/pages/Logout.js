import React from 'react';

function Logout() {
  const handleLogout = () => {
    // Implement logout logic here
    console.log('User logged out');
    // You may want to redirect to the login page after logout
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Logout</h2>
      <p>You have been logged out. Thank you for using the application.</p>
      
      {/* Confirmation Message */}
      <p style={{ fontSize: '18px', margin: '20px 0' }}>
        Are you sure you want to log out?
      </p>

      {/* Logout Button */}
      <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
