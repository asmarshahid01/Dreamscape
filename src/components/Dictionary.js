import React, { useState,useEffect } from 'react'

const userDreams =[
    {id:1, title: "Falling", meaning:"Falling means you are afraid of failure."}
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