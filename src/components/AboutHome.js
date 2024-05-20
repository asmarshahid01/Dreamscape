import './css/AboutHome.css'
import React from 'react'

export default function AboutHome() {
  return (
    <div className='about-home-section-container'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <linearGradient id="star-gradient-about-home" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4daae5" />
                <stop offset="100%" stopColor="#fc2f7e" />
            </linearGradient>
            <path fill="url(#star-gradient-about-home)" d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162
            10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215
            1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685
            7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171
            13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899
            19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412
            18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285
            14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381
            18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156
            18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path>
        </svg>
        <p className='about-home-section-heading'>About</p>
        <div className='about-home-text-container'>
            <p className='about-home-text'>Dreamscape is an AI dream interpreter that uses an AI model to interpret your dreams. It also lets you
            share your dreams with other people if you're not satisfied with AI's interpretation. Others can view and comment their
            opinions on your dreams to help you figure out its meaning</p>
            <p className='about-home-warning'><b>Note:</b> AI or any person cannot provide you the accurate interpretation of your dreams. The only
            person who can interpret your dreams accurately is you. This tool is just to assist you to figure out the meaning of your dream</p>
            <p className='about-home-credits'><b>Project By:</b><br/><br/>Abdul Wahab&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Saad Sohail&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Zohaib Hassan&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Shahid Maqsood&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Asmar Shahid</p>
        </div>
        <p className='about-home-gemini'>Powered By Google's Gemini</p>
    </div>
  )
}