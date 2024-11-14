import React from 'react';
import './login.css'; 
import TextField from '@mui/material/TextField';

const Login = () => {
  return (
    <div className="LoginContainer">
      <h1>Fundo</h1>
      <h2>Sign in</h2>
      <p>Use your Fundoo Account</p>
      <form>
        <div className="LoginInput">
        <input type="text" placeholder="Email Or Phone*" />
          <br />
          <br />
          <input type="password" placeholder="Password*" />
          <br />
          <br />
        </div>
        <a href="#">Forgot password?</a>
        <div className="LoginLink">
          <a href="#">Create account</a>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
