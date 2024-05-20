import Discussions from './Discussions'
import Forum from './Forum'
import Navbar from './Navbar'
import MyDreams from './MyDreams'
import Sidebar from './Sidebar'
import './css/Homepage.css'
import React, { useState } from 'react'
import AboutHome from './AboutHome'
import LandingNavbar from './LandingNavbar'

export default function Homepage() {

    const [addDream, setAddDream] = useState(false);
    const [currentScreen, setCurrentScreen] = useState(1);
    const [showNotifications, setShowNotifications] = useState(false);
    const [userNotifications, setUserNotifications] = useState([
        
    ]);

    const changeCurrentScreen = (screen) => {
        setCurrentScreen(screen);
    }

    const dreamAdded = () => {
        setAddDream(false);
    }

    const handleShowNotifications = () => {
        setShowNotifications(true);
    }

    const [showAboutSectionHome, setShowAboutSectionHome] = useState(false);

    const handleAboutSectionHomeShow = (val) => {
        setShowAboutSectionHome(val);
    }

  return (
    <>
        <div className='home-page'>
            {showAboutSectionHome ? <><Navbar handleAboutSectionHomeShow={handleAboutSectionHomeShow}></Navbar><AboutHome></AboutHome></> : <><Navbar handleAboutSectionHomeShow={handleAboutSectionHomeShow}></Navbar>
            <Sidebar changeCurrentScreen={changeCurrentScreen} handleShowNotifications={handleShowNotifications}></Sidebar>
            {currentScreen === 1 ? <><div className='add-dream' onClick={() => {setAddDream(true)}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563
                    6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256
                    2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
                </svg>
                <p>Add a dream</p>
            </div>
            <MyDreams addDream={addDream} dreamAdded={dreamAdded}></MyDreams></> : currentScreen === 2 ? <Forum></Forum> : currentScreen === 3 ?
            <Discussions></Discussions> : <></>}</>}
        </div>
        {showNotifications && <div className='notifications-overlay'>
            <div className='notifications-container' onClick={() => {setShowNotifications(false)}}>
                <div className='close-notifications'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997
                        13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                    </svg>
                </div>
                <div className='scrollable-notifications-container'>
                    {userNotifications && userNotifications.length > 0 ? userNotifications.map((noti, notiIndex) => {
                        return <div className='notification' key={notiIndex}>
                            <p className='notification-time'>{noti.dateOrTime}</p>
                            <p className='notification-text'>{noti.notification}</p>
                        </div>
                    }): <p className='no-notifications'>No notifications</p>}
                </div>
            </div>
        </div>}
    </>
  )
}
