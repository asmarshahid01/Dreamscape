import './css/Landing.css'
import React, { useState } from 'react'
import star from '../resources/images/star.png'
import LandingNavbar from './LandingNavbar';
import SignUp from './SignUp';
import Login from './Login'
import About from './About';

export default function Landing() {

    const [signupClicked, setSignupClicked] = useState(false);
    const [loginClicked, setLoginClicked] = useState(false);
    const [nextClicked, setNextClicked] = useState(false);
    const [userFullNameInput, setUserFullNameInput] = useState('');
    const [showAboutSection, setShowAboutSection] = useState(false);
    const [goBackToLanding, setGoBackToLanding] = useState(true);

    const handleAboutSectionShow = (val) => {
        setShowAboutSection(val);
        setGoBackToLanding(!val)
    }

    return (
        <div id='landing-page'>
            <LandingNavbar handleAboutSectionShow={handleAboutSectionShow}></LandingNavbar>
            <img className='star' id='star-one' src={star} alt='star'/>
            <img className='star' id='star-two' src={star} alt='star'/>
            <img className='star' id='star-three' src={star} alt='star'/>
            {showAboutSection ? <About></About> : loginClicked && !goBackToLanding ? <Login></Login> : nextClicked ? <SignUp></SignUp> : 
            <div id='landing-page-main'>
                <h1 id='landing-page-heading'>Analyze your dreams</h1>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1283 132" className='underline-svg'>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#de8d9e" />
                    <stop offset="100%" stopColor="#a69ce8" />
                </linearGradient>
                    <path fill="url(#gradient)" style={{ stroke: 'url(#gradient)', strokeWidth: 10 }} d="M1282.46 5.79c-.91-3.88-5.18-6.65-9.04-5.54-104.37
                    29.02-193.78 56.87-361.6 74.53-268.41 28.16-539.6 14.6-803.08-26.38C94.9 47.97-.34 26.24.08 41.38c-1.56
                    14.21 19.47 12.91 29.6 17.24 32.82 8.6 66.1 15.33 99.4 21.81 238.99 44.43 482.98 55.29 725.63 49.01
                    92.37-4.11 185.68-9.96 275.51-33.09 18.68-6.31 42.79-9.21 55.18-25.89 6.76-13.28-12.41-21.16-13.83-6.12-17.69
                    11.67-39.31 15.61-59.45 21.34-114.56 25.18-245.31 30.46-361.99 30.36-191.39.45-383.13-10.13-572-42.21 277.31
                    36.42 560.77 44.96 837.82 2.23 104.21-15.4 195.11-42.74 260.97-61.22a7.57 7.57 0 0 0 5.54-9.05Z"></path>
                </svg>
                <p id='landing-page-desc'>Unlock the mysteries of your subconscious with our innovative dream analysis platform</p>
                <div id={signupClicked ? 'sign-up-btn-container-clicked' : 'sign-up-btn-container'} onClick={() => {setSignupClicked(true)}}>
                    <div id={signupClicked ? 'sign-up-btn-clicked' : 'sign-up-btn'} onClick={() => {signupClicked && userFullNameInput !== '' ? setNextClicked(true) : setNextClicked(false)}}>
                        {signupClicked ? 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className='user-signup-next-svg'>
                            <path d="M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326
                            14.8289L12.1717 12.0005Z"></path>
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className='user-signup-svg'>
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716
                            12.9999H4V10.9999H16.1716Z"></path>
                        </svg>}
                    </div>
                    {signupClicked ? <input id='landing-page-name' type='text' placeholder='Enter Your Name' value={userFullNameInput}
                    onChange={(e) => {setUserFullNameInput(e.target.value)}}></input> : <p id='sign-up-txt'>Get Started</p>}
                </div>
                <p id='landing-page-login' onClick={() => {setLoginClicked(true); setGoBackToLanding(false)}}>Already have an account</p>
            </div>}
        </div>
    )
}
