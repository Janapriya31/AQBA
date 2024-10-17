// src/admin/pages/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from '../../config/firebase';

import './AdminLogin.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Logic to validate login
        if (username && password) {
            navigate('/admin/dashboard');
        } else {
            alert('Please enter valid credentials');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log('User Info:', result.user);
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error signing in with Google:', error);
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

