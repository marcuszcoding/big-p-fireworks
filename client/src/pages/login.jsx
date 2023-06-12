import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the server
      const response = await axios.post('/api/auth/login', { email, password });
      const { token } = response.data;

      // Save the token to local storage or session storage
      localStorage.setItem('token', token);

      // Redirect to the desired page (e.g., dashboard)
      window.location.href = '/';
    } catch (error) {
      console.log('Login failed:', error);
      // Handle login error, show error message, etc.
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className='register-link'>Don't have an account? <a className='register-button' href="/register">Sign Up</a></p>
    </div>
  );
};

export default Login;