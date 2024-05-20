import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { LikesDislikes } from './actions';
import store from '../store';
import axios from 'axios';

import './css/Homepage.css'

export default function Analytics(){

    const dispatch = useDispatch()
    const { likes, dislikes } = useSelector(state => state);


    useEffect(()=>{

        const myfunc=async ()=>{
            const response = await axios.get("http://localhost:8080/api/admin/analytics")
        console.log(response)
        dispatch(LikesDislikes(response.data.Likes,response.data.Dislikes))
        }

        myfunc()
    },[])

    console.log(likes,dislikes)


    return(
        <>
        <div className='home-page'>
            <h1>Likes:{likes}</h1>
            <div>Dislikes:{dislikes}</div>
        </div>
        </>
    )
}