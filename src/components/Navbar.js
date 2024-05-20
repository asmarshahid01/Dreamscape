import './css/Navbar.css'
import React from 'react'

export default function Navbar(props) {
  return (
    <div>
      <ul className="home-navbar">
        <li onClick={() => {props.handleAboutSectionHomeShow(true)}}>About</li>
      </ul>
      <h1 className='home-website-logo-txt' onClick={() => {props.handleAboutSectionHomeShow(false)}}>Dreamscape.</h1>
    </div>
  )
}
