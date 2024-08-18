import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { LikesDislikes } from './actions';
import store from '../store';
import axios from 'axios';
import './css/Analytics.css'
import Navbar from './Navbar';
import AboutHome from './AboutHome';

import './css/Homepage.css'

export default function Analytics(){

    //const dispatch = useDispatch()
    //const { likes, dislikes } = useSelector(state => state);
    const [user,setUser]=useState([]);
    const [likes,setLikes]=useState(0)
    const [dislikes,setDislikes]=useState(0)
    const token = localStorage.getItem('token');

    useEffect(()=>{
      const myfunc=async ()=>{
        const response = await axios.get("http://localhost:8080/api/admin/analytics", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log(response.data)
        setLikes(response.data.data.likes)
        setDislikes(response.data.data.dislikes) 
        //dispatch(LikesDislikes(response.data.Likes,response.data.Dislikes))
      }
      const myFunc=async()=>{
        const response=await axios.get("http://localhost:8080/api/admin/user", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setUser(response.data.data);
        console.log(response.data);
      }
      myFunc();
      myfunc();
    },[]
  )
  const user2 = user?.filter(user => user.username!="admin");
    const convertTime=(ms)=>{
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    return `${hours}:${minutes}:${seconds}`;
    }

      const [showAboutSectionHome, setShowAboutSectionHome] = useState(false);

    const handleAboutSectionHomeShow = (val) => {
        setShowAboutSectionHome(val);
    }

    return(
        <div className='analytics'>
            {showAboutSectionHome ? <><Navbar handleAboutSectionHomeShow={handleAboutSectionHomeShow} ></Navbar><AboutHome></AboutHome></> : <><Navbar handleAboutSectionHomeShow={handleAboutSectionHomeShow}></Navbar>
            <div className='analytics-container'>
                <h1 className='analytics-heading'>Analytics</h1>
                <div className='likes-dislikes-count-text'>
                    <p><b>Total Interactions:</b> {likes + dislikes}</p>
                </div>
            </div>
            <section className="sect">
                <p><b>Likes:</b> {likes}</p>
                <p><b>Dislikes:</b> {dislikes}</p>
            </section>
            <table>
              <tr>
                <th>
                  Username
                </th>
                <th>
                  Time Spent
                </th>
              </tr>
              {
              user2?.map((User,index)=>(
                <tr>
                  <td>
                    {User.username}
                  </td>
                  <td>
                    {convertTime(User.time)}
                  </td>
                </tr>
              ))
              }
            </table></>}
        </div>
    )
}