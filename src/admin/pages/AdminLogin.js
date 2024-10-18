// src/admin/pages/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from '../../config/firebase';

import './AdminLogin.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (username && password) {
            try {
                const response = await fetch('http://localhost:5000/login', { // Change the URL as per your server configuration
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    // Successful login
                    console.log('Login successful:', data);
                    navigate('/admin/dashboard');
                } else {
                    // Handle errors
                    alert(data.error || 'Login failed. Please check your credentials.');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred. Please try again later.');
            }
        } else {
            alert('Please enter valid credentials');
        }
    };
    
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
    
            // Send the Google user data (email, etc.) to your backend to check if the user exists
            const response = await fetch('http://localhost:5000/google-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email }), // Send only necessary user data
            });
    
            const data = await response.json();
    
            if (response.ok && data.exists) {
                // If user exists in the database, log in and navigate to dashboard
                console.log('Google Login successful:', data);
                navigate('/admin/dashboard');
            } else {
                // User doesn't exist in the database
                alert('Your Google account is not registered. Please contact the admin.');
            }
        } catch (error) {
            console.error('Error during Google login:', error);
            alert('Failed to sign in with Google. Please try again.');
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
                        <button type="submit">Login</button>
                    </div>
                </form>
                <div className="or-separator">OR</div>
                <button className="google-signin-button" onClick={handleGoogleSignIn}>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default AdminLogin;

