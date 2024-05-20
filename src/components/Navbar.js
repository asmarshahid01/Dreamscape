import './css/Navbar.css'
import React from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {

  const navigate=useNavigate();
  const handleLogout=async()=>{
    try {
        // Send a POST request to your server-side endpoint with the username and password
        const response = await axios.get("http://localhost:8080/api/logout",{withCredentials:true});
        console.log(response.data); // Assuming the server returns some data upon successful signup
        if (response.data){
            navigate("/");
        }
        } catch (error) {
        console.error('Error signing up:', error);
        // Handle errors, e.g., display an error message to the user
        }
}
  return (
    <div>
      <ul className="home-navbar">
        <li onClick={() => {props.handleAboutSectionHomeShow(true)}}>About</li>
        <li onClick={handleLogout}>Log Out</li>
      </ul>
      <h1 className='home-website-logo-txt' onClick={() => {props.handleAboutSectionHomeShow(false)}}>Dreamscape.</h1>
    </div>
  )
}
