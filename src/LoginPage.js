import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import './LoginPage.css';
import logo from './assets/rcycle-combomarkremovebgpreview-1@2x.png'; // Import the logo image

function LoginPage() {
  const [isAdmin, setIsAdmin] = useState(true); // Admin/Employee toggle
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = (e) => {
    e.preventDefault();
    // Hardcoded credentials check
    if (email === 'gosikhena@gmail.com' && password === 'Peniel2015$') {
      navigate('/scanned-items'); // Redirect to Scanned Items page on success
    } else {
      alert('Incorrect email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-section">
          <img src={logo} alt="rCycle Logo" className="logo-image" />
          <span className="beta-tag">Beta</span>
        </div>
        <h1>Welcome back</h1>
        <h3>Welcome back! Please enter your details.</h3>

        <div className="login-toggle">
          <button
            className={`toggle-btn ${isAdmin ? 'active' : ''}`}
            onClick={() => setIsAdmin(true)}
          >
            Admin
          </button>
          <button
            className={`toggle-btn ${!isAdmin ? 'active' : ''}`}
            onClick={() => setIsAdmin(false)}
          >
            Employee
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="options">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember for 30 days</label>
            </div>
            <a href="/forgot-password" className="forgot-password">Forgot password</a>
          </div>

          <button type="submit" className="login-btn">Log in</button>
        </form>

        <div className="signup-text">
          Don’t have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
      <footer>©rCycle 2024</footer>
    </div>
  );
}

export default LoginPage;
