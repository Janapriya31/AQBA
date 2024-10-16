// TrainerLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this file exists

const TrainerLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username && password) {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    alert(errorData.error);
                    setLoading(false);
                    return;
                }

                const result = await response.json();
                console.log('Login successful:', result);
                
                localStorage.setItem('user', JSON.stringify(result.user));
                navigate('/trainer/dashboard'); // Redirect to the trainer dashboard
            } catch (error) {
                console.error('Error during login:', error);
                alert('Error during login. Please try again.');
                setLoading(false);
            }
        } else {
            alert('Please enter valid credentials');
        }
    };

    return (
        <div className="login-body">
            <div className="login-container">
                <h2>Trainer Login</h2>
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

export default TrainerLogin;
