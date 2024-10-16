import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './MainPage.css';// Import CSS for styling

const MainPage = () => {
    const navigate = useNavigate(); // Initialize navigate function
    
    const handleRegister = () => {
        navigate('/register');
      };

    const handleAdminLogin = () => {
        navigate('/admin/login');
      };
    
      // Navigate to Employee Login Page
      const handleEmployeeLogin = () => {
        navigate('/employee/login');
      };
    
      // Navigate to Trainer Login Page
      const handleTrainerLogin = () => {
        navigate('/trainer/login');
      };
    

    return (
        <div className="MainPage">
        <div className="signup-container">
            <div className="button-container">
                <button className="btn" onClick={() => handleRegister('Register')}>Register</button>
                <button className="btn" onClick={() => handleAdminLogin('Administrator')}>Administrator Login</button>
                <button className="btn" onClick={() => handleTrainerLogin('Trainer')}>Trainer Login</button>
                <button className="btn" onClick={() => handleEmployeeLogin('Employee')}>Employee Login</button>
            </div>
        </div>
        </div>
    );
};

export default MainPage;
