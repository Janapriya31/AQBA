import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup } from '../config/firebase'; // Adjust your import as necessary

const RegisterPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        mobileNumber: '',
        password: '',
        role: '',
        secretCode: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                setErrorMessage(`Failed to register: ${errorText}`);
                throw new Error('Failed to register: ' + errorText);
            }

            const result = await response.json();
            console.log('Registration successful:', result);
            setSuccessMessage('Registration successful!');
            setErrorMessage('');

            // Optionally navigate to another page, e.g., login
            // navigate('/login');
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log('Google Sign-In successful:', user);

            // Send user data to MongoDB
            const response = await fetch('http://localhost:5000/register', { // Adjust URL as necessary
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.displayName || user.email, // Use displayName or email as username
                    email: user.email,
                    password: 'defaultPassword', // Handle password management appropriately
                    name: user.displayName,
                    mobileNumber: '', // Collect this information separately if needed
                    role: 'User', // Set a default role or manage it as needed
                    secretCode: null, // Manage secret code based on your app logic
                }),
            });

            if (response.ok) {
                console.log('User data stored in MongoDB successfully.');
                setSuccessMessage('Registration successful with Google!');
                setErrorMessage('');
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to store user data in MongoDB.');
            }
        } catch (error) {
            console.error('Error signing in with Google:', error);
            setErrorMessage('Failed to sign in with Google. Please try again.');
        }
    };

    return (
        <div className="register">
            <div className="register-container">
                <h1>Registration</h1>
                {errorMessage && <p className="error">{errorMessage}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobileNumber">Mobile Number:</label>
                        <input
                            type="text"
                            id="mobileNumber"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="off"
                        />
                        <small>
                            Password must be 8-20 characters, contain at least one uppercase letter, one lowercase letter, one number, one special character, and no spaces.
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a role</option>
                            <option value="Administrator">Administrator</option>
                            <option value="Trainer">Trainer</option>
                            <option value="Employee">Employee</option>
                        </select>
                    </div>
                    {(formData.role === 'Administrator' || formData.role === 'Trainer') && (
                        <div className="form-group">
                            <label htmlFor="secretCode">Secret Code:</label>
                            <input
                                type="password"
                                id="secretCode"
                                name="secretCode"
                                value={formData.secretCode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="button-group">
                        <button type="button" onClick={() => navigate(-1)} className="back-btn">Back</button>
                        <button type="submit">Register</button>
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

export default RegisterPage;
