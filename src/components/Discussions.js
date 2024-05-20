import './css/Forum.css'
import React, { useState,useEffect } from 'react'
import axios from "axios";

export default function Forum() {

    const [commentsExpanded, setCommentsExpanded] = useState(false);
    const [publicDreamSelected, setpublicDreamSelected] = useState('');
    const [userComment, setUserComment] = useState('');
    const [publicDreams, setPublicDreams] = useState([]);
    const [increment,setIncrement]=useState(1);


    useEffect(() => {
        // Make an API call to fetch user data from the backend
        const fetchUserData = async () => {
            try {
                // Send a POST request to your server-side endpoint with the username and password
                const response = await axios.get("http://localhost:8080/api/showpublicuser",{withCredentials:true});
                console.log(response.data); // Assuming the server returns some data upon successful signup
                if (response.data){
                    console.log("returned");
                    console.log(response.data);
                    let data=[];
                    if (response.data) {
                        const updatedPublicDreams = response.data.map(item => {
                            const { title, date, dream, meaning } = item.journalinfo;
                            const { username } = item.userinfo;
                            const comments=item.comments;
                            console.log("HELLO3");
                            console.log(item.comments);
                            console.log("HELLO3");
                            return { title, date, dream, meaning, username,comments};
                        });
                        setPublicDreams(updatedPublicDreams);
                    }
                    console.log("HELLO1");
                    console.log(publicDreams);
                    console.log("HELLO1");
                    // setPublicDreams(response.data);
                }
                // setSignupSuccess(true);
              } catch (error) {
                console.error('Error signing up:', error);
                // Handle errors, e.g., display an error message to the user
              }
        };
  
        fetchUserData();
    },[increment]);


    const submitComment = async (username) => {
        setUserComment("");
        console.log("HELLO");
        try {
          // Send a POST request to your server-side endpoint with the username and password
          const response = await axios.post("http://localhost:8080/api/comment",{username,userComment},{withCredentials:true});
          console.log(response.data); // Assuming the server returns some data upon successful signup
          if (response.data==="success"){
              setIncrement(a=>a+1);
              console.log("done");
          }
          // setSignupSuccess(true);
        } catch (error) {
          console.error('Error signing up:', error);
          // Handle errors, e.g., display an error message to the user
        }
      };







  return (
    <div className='public-dreams-container'>
        {publicDreams.map((publicDream, index) => {
            return <div className={commentsExpanded ? 'public-dream-expanded' : 'public-dream'} key={index}>
                <div className='expand-comments-btn' onClick={() => {setCommentsExpanded(true); setpublicDreamSelected(index)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path>
                    </svg>
                </div>
                <div className='public-dream-title-container'>
                    <p className='public-dream-title'>{publicDream.title}</p>
                    <p className='public-dream-date'>{publicDream.date}</p>
                </div>
                <p className='public-dream-txt'>{publicDream.dream}</p>
                {commentsExpanded && publicDream.comments && publicDream.comments.map((publicComment, NestedIndex) => {
                    return <div className='public-dream-comment' key={NestedIndex}>
                        <div className='comment-container'>
                            <p className='commenter-name'>{publicComment.commentedBy}:</p>
                            <p className='comment-text'>{publicComment.comment}</p>
                        </div>
                        <div className='comment-reply-btn' onClick={() => {setUserComment('@' + publicComment.user + ' ')}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11 20L1 12L11 4V9C16.5228 9 21 13.4772 21 19C21 19.2727 20.9891 19.5428 20.9677 19.81C19.5055
                                17.0364 16.6381 15.119 13.313 15.0053L13 15H10.9999L11 20ZM8.99986 13H10.9999L13.0341 13.0003L13.3814
                                13.0065C14.6657 13.0504 15.9053 13.3165 17.0568 13.7734C15.5898 12.0749 13.4204 11 11 11H9V8.16125L4.20156
                                12L8.99992 15.8387L8.99986 13Z"></path>
                            </svg>
                        </div>
                    </div>
                })}
                <div className='public-dream-comments'>
                    <input type='text' placeholder='Write a comment'
                    className='public-dream-comment-input'
                    value={index === publicDreamSelected ? userComment : ''} onChange={(e) => {index === publicDreamSelected && setUserComment(e.target.value)}}
                    onFocus={() => {if (publicDreamSelected !== index) {setpublicDreamSelected(index); setUserComment('')}}}></input>
                    <div onClick={()=>submitComment(publicDream.username)} className='post-user-comment'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229
                            9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866
                            21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        })}
    </div>
  )
}
