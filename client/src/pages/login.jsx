import React, { useState } from 'react';
import '../styles/Login.css';


const Login = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <p className='register-link'>Don't have an account? <a className='register-button'href="#!">Sign Up</a></p>
    </div>
  );
};

export default Login;