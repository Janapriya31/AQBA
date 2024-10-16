import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

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
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();  // Always expect JSON
                setErrorMessage(`Failed to register: ${errorData.error}`);
                throw new Error('Failed to register: ' + errorData.error);
            }
    
            const result = await response.json();
            console.log('Registration successful:', result);
            setSuccessMessage('Registration successful!');
            setErrorMessage('');
            // Optionally navigate to another page
            // navigate('/login');
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage('Error during registration. Please try again.');
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
                        autoComplete = "off"
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
                        autoComplete = "off"
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
                        autoComplete = "off"

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
                        autoComplete = "off"
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
                        autoComplete = "off"
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
                {/* Display Secret Code only for Administrator and Trainer */}
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
                <button type="submit" onClick={() => navigate(-1)} className="back-btn">Back</button>
                <button type="submit">Register</button>
            </form>
        </div>
        </div>
    );
};

export default RegisterPage;
