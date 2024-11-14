import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from '../assets/rcycle-combomarkremovebgpreview-1@2x.png';

function LoginPage() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const adminEmail = 'gosikhena@gmail.com';
    const adminPassword = 'Peniel2015$';
    const employeeEmail = 'goshp4christ@gmail.com';
    const employeePassword = 'Employee2023$';

    if (
      (isAdmin && email === adminEmail && password === adminPassword) ||
      (!isAdmin && email === employeeEmail && password === employeePassword)
    ) {
      localStorage.setItem('authToken', 'your-auth-token');
      navigate('/scanned-items');
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
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="options">
          <div className="checkbox-container">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember for 30 days</label>
          </div>
          <span className="forgot-password" onClick={() => navigate('/reset-password')}>
            Forgot password
          </span>

        </div>

        <button type="submit" className="login-btn">Log in</button>
      </form>

      <div className="signup-text">
        Don’t have an account? <a href="/signup">Sign up</a>
      </div>
    </div>

  <p className="terms-text">
    By proceeding you acknowledge that you have read, understood <br />
    and agree to our Terms and Conditions.
  </p>
  <footer>©rCycle 2024</footer>
</div>


  );
}

export default LoginPage;
