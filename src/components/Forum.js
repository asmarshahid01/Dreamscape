import './css/Forum.css'
import React, { useState,useEffect } from 'react'
import axios from "axios";

export default function Forum() {

    const [mainDream,setMainDream]=useState([]);
    const [commentsExpanded, setCommentsExpanded] = useState(false);
    const [publicDreamSelected, setpublicDreamSelected] = useState('');
    const [userComment, setUserComment] = useState('');
    const [publicDreams, setPublicDreams] = useState([]);
    const token = localStorage.getItem('token');

    const [searchTxt, setSearchTxt] = useState('');
    const [publicDreamsCopy] = useState(publicDreams);

    const filteredDreams = publicDreamsCopy.filter((item) =>
        item.dream.toLowerCase().includes(searchTxt.toLowerCase())
    );
    const [increment,setIncrement]=useState(1);
    //     {
    //         title: 'Lorem Ipsum',
    //         date: '4 / 5 / 2024',
    //         dream: 'random dream',
    //         comments: [{
    //             user: 'user1',
    //             comment: 'hello world'
    //         }]
    //     },
    //     {
    //         title: 'Lorem Ipsum 2',
    //         date: '3 / 5 / 2024',
    //         dream: 'random dream number 2',
    //         comments: [{
    //             user: 'user1',
    //             comment: 'hello world'
    //         },
    //         {
    //             user: 'user2',
    //             comment: 'hello world number 2'
    //         }]
    //     }
    // ]);


    useEffect(() => {
        // Make an API call to fetch user data from the backend
        const fetchUserData = async () => {
            try {
                // Send a POST request to your server-side endpoint with the username and password
                const response = await axios.get("http://localhost:8080/api/dreams/showpublic",{
                    headers: {
                    'Authorization': `Bearer ${token}`
                  },withCredentials:true});
                console.log(response.data); // Assuming the server returns some data upon successful signup
                if (response.data){
                    console.log("returned");
                    console.log(response.data);
                    let data=[];
                    if (response.data) {
                        const updatedPublicDreams = response.data.data.map(item => {
                            const { _id,title, date, dream, meaning } = item.journalinfo;
                            const { username } = item.userinfo;
                            const comments=item.comments;
                            console.log("HELLO3");
                            console.log(item.comments);
                            console.log("HELLO3");
                            return { _id,title, date, dream, meaning, username,comments};
                        });
                        setPublicDreams(updatedPublicDreams);
                        setMainDream(updatedPublicDreams);
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

    
    const submitComment = async (username,id) => {
        setUserComment("");
        console.log("HELLO");
        try {
          // Send a POST request to your server-side endpoint with the username and password
          const response = await axios.post("http://localhost:8080/api/user/comment",{username,userComment,id},{
            headers: {
            'Authorization': `Bearer ${token}`
          }, withCredentials:true});
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

      const searchInput=(val)=>{
        setPublicDreams(mainDream)
        if(val!==""){    
        let updatedSearch;
        setSearchTxt(val);
        console.log(publicDreams)
        updatedSearch=publicDreams.filter((dream)=>{
            const dreamText = dream.dream.toLowerCase();
            console.log(dreamText)
            const searchText = val.toLowerCase();
            return dreamText.includes(searchText);
        });
        setPublicDreams(updatedSearch);}
        else{
            setPublicDreams(mainDream);
        }
    }


  return (
    <div className='public-dreams-container'>
        <div className='search-container'>
            <input className='search-bar' type='search' value={searchTxt} onChange={(e) => {setSearchTxt(e.target.value); searchInput(e.target.value)}} placeholder='Search'></input>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
        </div>
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
                {commentsExpanded && index === publicDreamSelected && publicDream.comments && publicDream.comments.map((publicComment, NestedIndex) => {
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
                    <div onClick={()=>submitComment(publicDream.username,publicDream._id)} className='post-user-comment'>
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
