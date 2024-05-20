import './css/SignUp.css'
import React, { useState } from 'react'

export default function SignUp() {

  const [username, setUsername] = useState(null);
  const [usernameSelected, setUsernameSelected] = useState(false);
  const [genderSelected, setGenderSelected] = useState(0);
  const [genderConfirmed, setGenderConfirmed] = useState(false);
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);

  return (
    <div className='signup-container'>
      {!usernameSelected ? <div className='signup-username-container'>
        <p id='signup-username-heading'>Choose a username</p>
        <div id='signup-username-input-container'>
          <input id='signup-username-input' type='text' placeholder='Enter username' onChange={(e) => {setUsername(e.target.value)}} value={username ? username : ''}></input>
          <div id={username === null ? 'signup-username-btn' : username === 'asmar' ? 'signup-username-btn-true' : 'signup-username-btn-false'} className='signup-username-btn-container' onClick={() => {username === 'asmar' ? setUsernameSelected(true) : setUsernameSelected(false)}}><i></i></div>
        </div>
      </div> : !genderConfirmed ?
      <div className='signup-gender-container'>
        <p id='signup-gender-heading'>I'm a</p>
        <div id='signup-gender-input-container'>
          <div id={genderSelected === 1 ? 'signup-gender-male-btn-filled' : 'signup-gender-male-btn'} className='signup-gender-btn' onClick={() => {setGenderSelected(1)}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.0491 8.53666L18.5858 5H14V3H22V11H20V6.41421L16.4633 9.95088C17.4274 11.2127 18 12.7895 18 14.5C18
              18.6421 14.6421 22 10.5 22C6.35786 22 3 18.6421 3 14.5C3 10.3579 6.35786 7 10.5 7C12.2105 7 13.7873 7.57264
              15.0491 8.53666ZM10.5 20C13.5376 20 16 17.5376 16 14.5C16 11.4624 13.5376 9 10.5 9C7.46243 9 5 11.4624 5
              14.5C5 17.5376 7.46243 20 10.5 20Z"></path>
            </svg>
            Male</div>
          <div id={genderSelected === 2 ? 'signup-gender-female-btn-filled' : 'signup-gender-female-btn'} className='signup-gender-btn' onClick={() => {setGenderSelected(2)}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 15.9339C7.33064 15.445 4.5 12.3031 4.5 8.5C4.5 4.35786 7.85786 1 12 1C16.1421 1 19.5 4.35786
              19.5 8.5C19.5 12.3031 16.6694 15.445 13 15.9339V18H18V20H13V24H11V20H6V18H11V15.9339ZM12 14C15.0376 14
              17.5 11.5376 17.5 8.5C17.5 5.46243 15.0376 3 12 3C8.96243 3 6.5 5.46243 6.5 8.5C6.5 11.5376 8.96243 14 12 14Z"></path>
            </svg>
            Female</div>
        </div>
        <div className='signup-next-btn' id={genderSelected === 0 ? 'signup-next-btn-not-available' : 'signup-next-btn-available'} onClick={() => {genderSelected === 0 ? setGenderConfirmed(false) : setGenderConfirmed(true)}}>Next
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
          </svg>
        </div>
      </div> : !passwordConfirmed ?
        <div className='signup-password-container'>
          <p id='signup-password-heading'>Choose a password</p>
          <div className='signup-password-container'>
          <input id='signup-password-input' type='password' placeholder='Enter password' onChange={(e) => {setPassword(e.target.value)}} value={password} className='signup-password'></input>
          <input id='signup-password-confirm-input' type='password' placeholder='Confirm password' onChange={(e) => {setRetypePassword(e.target.value)}} value={retypePassword} className='signup-password'></input>
          <div className='signup-next-btn' id={password === retypePassword && password !== '' ? 'signup-password-next-btn-available' : 'signup-password-next-btn-not-available'} onClick={() => {password === retypePassword && password !== '' ? setPasswordConfirmed(true) : setPasswordConfirmed(false)}}>Next
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
            </svg>
          </div>
        </div>
      </div> :
      <div>
        Hello
      </div>}
    </div>
  )
}
