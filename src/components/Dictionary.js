import React, { useState,useEffect } from 'react'

const userDreams =[
    {id:1, title: "Falling", meaning:"Falling means you are afraid of failure."},
    {id:2, title: "Running", meaning:"You have some unresolved trauma"},
    {id:3, title: "Gold", meaning:"Seeing gold in a dream might resemble success"},
    {id:4, title: "Family", meaning:"Might symbolize fundamental connections and relationships in one's life"},
    {id:5, title: "Crush", meaning:"A dream featuring a crush symbolizes intense feelings of infatuation or attraction towards someone."}
]
export default function Dictionary(){
    return(
        <>
            <div className='user-dreams-container'>
                {userDreams.map((dream) => {
                    return <div className='user-dream' key={dream._id}>
                        <div className='user-dream-header'>
                            <div className='user-dream-title-container'>
                                <p className='user-dream-title'>{dream.title}</p>
                            </div>
                        </div>
                        <p className='user-dream-txt'>{dream.meaning}</p>
                    </div>
                })}
            </div> 
        </>
    )
}