import React from 'react';
import './register.css'; 
import image1 from '../../assets/image.png'
const Register = () => {
  return (
    <div className="RegisterPage">
      <div className="RegisterContainer">
        <h1>Fundo</h1>
        <h2>Create your Fundo Account</h2>
        <form>
          <div className="RegisterInput-group-1">
            <input type="text" placeholder="First Name*" />
            <input type="text" placeholder="Last Name*" />
          </div>
          <br />
          <div className="RegisterUsername">
            <input type="text" placeholder="Username*" />
          </div>
          <p>You can use letters, numbers and periods</p>
          <div className="RegisterPassword">
            <input type="password" placeholder="Password*" />
            <input type="password" placeholder="Confirm *" />
          </div>
        </form>
        <p>Use 8 or more characters with letters, numbers and symbols</p>
        <div className="RegisterLink">
          <a href="/login">Sign in instead</a>
          <button type="submit">Register</button>
        </div>
      </div>
      <div className="RegisterImage">
        <img src={image1} alt="Signup visual" width="100%" />
      </div>
    </div>
  );
};

export default Register;
