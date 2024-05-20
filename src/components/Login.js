import './css/Login.css'
import React, { useState } from 'react'

export default function Login() {

    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginInfoValid, setLoginInfoValid] = useState(true);

    const handleLoginValidityCheck = () => {
      //whatever checks
      setLoginInfoValid(false);
    }

  return (
    <div className='login-container'>
        {!loginInfoValid && <p className='login-error'>Invalid Username or Password</p>}
        <p className='login-heading'>Login</p>
        <input className='login-input' type='text' value={loginUsername} onChange={(e) => {setLoginUsername(e.target.value)}} placeholder='Username'></input>
        <input className='login-input' type='password' value={loginPassword} onChange={(e) => {setLoginPassword(e.target.value)}} placeholder='Password'></input>
        <div className='user-login-btn' onClick={handleLoginValidityCheck}>Next</div>
    </div>
  )
}
