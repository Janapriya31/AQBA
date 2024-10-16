import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username && password) {
            setLoading(true); // Start loading
            try {
                const response = await fetch('http://localhost:5000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    alert(errorData.error); // Show specific error messages
                    setLoading(false); // Stop loading
                    return;
                }

                const result = await response.json();
                console.log('Login successful:', result);
                
                // Store user info in local storage
                localStorage.setItem('user', JSON.stringify(result.user));

                navigate('/admin/dashboard'); // Redirect to the admin dashboard
            } catch (error) {
                console.error('Error during login:', error);
                alert('Error during login. Please try again.');
                setLoading(false); // Stop loading on error
            }
        } else {
            alert('Please enter valid credentials');
        }
    };

    return (
        <div className="login-body">
            <div className="login-container">
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="button" onClick={() => navigate(-1)}>Back</button>
                        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
