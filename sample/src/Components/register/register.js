import React from 'react';
import './register.css'; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import image1 from '../../assets/image.png'
const Register = () => {
  return (
    <div className="RegisterPage">
      <div className="RegisterContainer">
        <h1>Fundo</h1>
        <h2>Create your Fundo Account</h2>
        <form>
          <div className="RegisterInput-group-1">
          <TextField id="outlined-basic" label="First Name*" variant="outlined" />
          <TextField label="Last Name*" id="outlined-size-normal" />
          </div>
          <br />
          <div className="RegisterEmail">
          <TextField label="Email*" id="outlined-size-normal" />
          </div>
          <p>You can use letters, numbers and periods</p>
          <div className="RegisterPassword">
          <TextField label="Password*" id="outlined-size-normal" />
          <TextField label="Confirm*" id="outlined-size-normal" />
          </div>
        </form>
        <p>Use 8 or more characters with letters, numbers and symbols</p>
        <div className="RegisterLink">
        <Link href="/Login" target="_blank" rel="noopener">Sign in Instead</Link>
          <Button variant="contained">Register</Button>
        </div>
      </div>
      <div className="RegisterImage">
        <img src={image1} alt="Signup visual" width="100%" />
        <p1>One account. All of </p1>
        <br/>
        <p1>Fundo working for you. </p1>
      </div>
    </div>
  );
};

export default Register;
