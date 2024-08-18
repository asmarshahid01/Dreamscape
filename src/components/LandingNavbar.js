import './css/LandingNavbar.css'
import React from 'react'

export default function LandingNavbar(props) {
  return (
    <div>
      <ul className="navbar">
        <li onClick={() => {props.handleAboutSectionShow(true)}}>About</li>
      </ul>
      <h1 className='website-logo-txt' onClick={() => {props.handleAboutSectionShow(false)}}>Dreamscape.</h1>
    </div>
  )
}
