import React from 'react';
import './login.css'; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

const Login = () => {
  return (
    <div className="LoginContainer">
      <div className='LoginFundo'>
      <h1>Fundo</h1>
      <h2>Sign in</h2>
      <p>Use your Fundoo Account</p>
      </div>
      <form className='LoginForm'>
        <div className="LoginInput">
        <TextField label="Email*" id="outlined-size-normal" />
          <br/>
          <TextField label="Password*" id="outlined-size-normal" />
          <br />
        </div>
        <div className='Login-Forget'>
        <Link href="/Login" target="_blank" rel="noopener">Forget Password? </Link>
        </div>
        
        <div className="LoginLink">
        <Link href="/Register" target="_blank" rel="noopener">Create Account</Link>
          <Button variant="contained">Login</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
