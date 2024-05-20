import './css/Sidebar.css'
import React, { useState,useEffect } from 'react'


export default function Sidebar(props) {

    const [itemSelected, setItemSelected] = useState(1);
    const [sidebarHover, setSidebarHover] = useState(false);
    const [userName,setUserName]=useState("");
    const [gender,setGender]=useState("");



    useEffect(() => {
      // Make an API call to fetch user data from the backend
      const fetchUserData = async () => {
          try {
              const response = await fetch("http://localhost:8080/api/dreams",{
                method:"GET",
                headers:{
                  "Content-Type":"application/json"
                },
                credentials:"include"
              });
              if (response.ok) {
                  const data = await response.json();
                  console.log(data);
                  setUserName(data.username);
                  setGender(data.gender);
                  // setUserData(data);
              } else {
                  // Handle error response
                  console.error('Failed to fetch user data');
              }
          } catch (error) {
              // Handle network error
              console.error('Error fetching user data:', error);
          }
      };

      fetchUserData();
  }, []);

  return (
    <div className='sidebar' onMouseEnter={() => {setSidebarHover(true)}} onMouseLeave={() => {setSidebarHover(false)}}>
        <div className='user-profile-container'>
            <div className='user-profile'>A</div>
            {sidebarHover ? <div className='user-profile-details'>
                <p className='user-profile-name'>{userName}</p>
                <p className='user-profile-gender'>{gender}</p>
            </div> : <></>}
        </div>
      <div className='sidebar-items'>
        <div className={itemSelected === 1 ? 'sidebar-item-selected' : 'sidebar-item'} id='home-icon' onClick={() => {setItemSelected(1); props.changeCurrentScreen(1)}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917
            3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575
            8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"></path>
        </svg>
        {sidebarHover ? <p className='sidebar-txt'>Home</p> : <></>}
        </div>
        <div className={itemSelected === 2 ? 'sidebar-item-selected' : 'sidebar-item'} id='forum-icon' onClick={() => {setItemSelected(2); props.changeCurrentScreen(2)}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10
                16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685
                16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6
                7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671
                17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042
                13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 
                5.35635L17.5962 3.41321Z"></path>
            </svg>
            {sidebarHover ? <p className='sidebar-txt'>Forum</p> : <></>}
        </div>
        <div className={itemSelected === 3 ? 'sidebar-item-selected' : 'sidebar-item'} id='discussion-icon' onClick={() => {setItemSelected(3); props.changeCurrentScreen(3)}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 22.5L11.2 19H6C5.44772 19 5 18.5523 5 18V7.10256C5 6.55028 5.44772 6.10256 6 6.10256H22C22.5523
                6.10256 23 6.55028 23 7.10256V18C23 18.5523 22.5523 19 22 19H16.8L14 22.5ZM15.8387 17H21V8.10256H7V17H11.2H12.1613L14
                19.2984L15.8387 17ZM2 2H19V4H3V15H1V3C1 2.44772 1.44772 2 2 2Z"></path>
            </svg>
            {sidebarHover ? <p className='sidebar-txt'>Discussions</p> : <></>}
        </div>
        <div className={itemSelected === 4 ? 'sidebar-item-selected' : 'sidebar-item'} onClick={() => {setItemSelected(4); props.changeCurrentScreen(4)}}>
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          {`.a { fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width:2px }`}
        </style>
      </defs>
      <polyline className="a" points="22.96 28 20.36 20 17.66 28" />
      <line className="a" x1="18.5604" y1="25.3" x2="22.0604" y2="25.3" />
      <polyline className="a" points="29.37 20 34.67 20 29.37 28 34.67 28" />
      <line className="a" x1="24.165" y1="24" x2="28.165" y2="24" />
      <path className="a" d="M8.4,6.5v35a2,2,0,0,0,2,2h2.33V4.5H10.4A2,2,0,0,0,8.4,6.5Z" />
      <path className="a" d="M12.73,4.5v39H37.6a2,2,0,0,0,2-2V6.5a2,2,0,0,0-2-2Z" />
    </svg>
            {sidebarHover ? <p className='sidebar-txt'>Dictionary</p> : <></>}
        </div>
      </div>
      <div className='user-notifications' onClick={() => {props.handleShowNotifications()}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM12 2C16.9706 2 21 6.04348 21
            11.0314V20H3V11.0314C3 6.04348 7.02944 2 12 2ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path>
        </svg>
        {sidebarHover ? <p className='user-notifications-txt'>Notifications</p> : <></>}
      </div>
    </div>
  )
}
