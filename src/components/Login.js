import './css/Login.css'
import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate=useNavigate();
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginInfoValid, setLoginInfoValid] = useState(true);

    const checkLogin=async()=>{
    console.log("HELLO");
    try {
        console.log(loginPassword);
        console.log(loginUsername);
      // Send a POST request to your server-side endpoint with the username and password
      const response = await axios.post("http://localhost:8080/api/login",{username:loginUsername,password:loginPassword},{withCredentials:true});
      console.log(response.data); // Assuming the server returns some data upon successful signup
      if (response.data==="admin"){
        navigate("/Analytics");
        
    }
      if (response.data==="success"){
          navigate("/Homepage");
          
      } else {
        setLoginInfoValid(false);
      }
      // setSignupSuccess(true);
    } catch (error) {
      console.error('Error signing up:', error);
      setLoginInfoValid(false);
      // Handle errors, e.g., display an error message to the user
    }
  };

  return (
    <div className='login-container'>
        {!loginInfoValid && <p className='login-error'>Invalid Username or Password</p>}
        <p className='login-heading'>Login</p>
        <input className='login-input' type='text' value={loginUsername} onChange={(e) => {setLoginUsername(e.target.value)}} placeholder='Username'></input>
        <input className='login-input' type='password' value={loginPassword} onChange={(e) => {setLoginPassword(e.target.value)}} placeholder='Password'></input>
        <div className='user-login-btn' onClick={checkLogin}>Next</div>
    </div>
  )
}
