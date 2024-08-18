// import './css/MyDreams.css'
// import React, { useState,useEffect } from 'react'
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import axios from "axios";

// export default function MyDreams(props) {


//     const [interpretation, setInterpretation] = useState('');

//     const genAI = new GoogleGenerativeAI(
//         "AIzaSyD5iwBsMJ6XToRsgT0tO4P4_4ty0fSo4So"
//     );
//     const fetchData = async () => {
//         const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//         const prompt = 'Interpret this dream, and provide just the interpretation text: ' + addDreamTxt;
//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const text = response.text();
//         setInterpretation(text);
//       };

//     const currentDate = new Date();
//     const month = currentDate.getMonth() + 1;
//     const year = currentDate.getFullYear();

//     const [dreamPublic, setDreamPublic] = useState(false);
//     const [userDreams, setUserDreams] = useState([]);
//     // const [addDreamTitle, setAddDreamTitle] = useState('');
//     const [addDreamTxt, setAddDreamTxt] = useState('');
//     const [fetchDataUpdate,setFetchDataUpdate]=useState(1);
//     const [interpretDream, setInterpretDream] = useState(false);
//     const [interpretationFetched, setInterpretationFetched] = useState(false);


//     useEffect(() => {
//         // Make an API call to fetch user data from the backend
//         const fetchUserData = async () => {
//             try {
//                 // Send a POST request to your server-side endpoint with the username and password
//                 const response = await axios.get("http://localhost:8080/api/showdreams",{withCredentials:true});
//                 console.log(response.data); // Assuming the server returns some data upon successful signup
//                 if (response.data){
//                     console.log("returned");
//                     setUserDreams(response.data);
//                 }
//                 // setSignupSuccess(true);
//               } catch (error) {
//                 console.error('Error signing up:', error);
//                 // Handle errors, e.g., display an error message to the user
//               }
//         };
  
//         fetchUserData();
//     },[fetchDataUpdate]);

//     const generateTitle = async () => {
//         const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//         const prompt = 'Generate a short title for this dream, choose the title from the text provided: ' + addDreamTxt;
//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const text = response.text();
//         return text
//     }


//     const handleSaveDream = async() => {
//         if(interpretationFetched) {
//             let newDream = {
//                 title: await generateTitle(),
//                 dream: addDreamTxt,
//                 meaning:interpretation,
//                 public: false,
//                 date: currentDate.getDate() + ' / ' + month + ' / ' + year
//             };
//             try {
//                 // Send a POST request to your server-side endpoint with the username and password
//                 const response = await axios.post("http://localhost:8080/api/dreams",newDream,{withCredentials:true});
//                 console.log(response.data); // Assuming the server returns some data upon successful signup
//                 if (response.data==="success"){
//                     console.log("inserted");
//                     setFetchDataUpdate(a=>a+1);
//                 }
//                 // setSignupSuccess(true);
//               } catch (error) {
//                 console.error('Error signing up:', error);
//                 // Handle errors, e.g., display an error message to the user
//               }


//             // setUserDreams([...userDreams, newDream]);
//             props.dreamAdded();
//             // setAddDreamTitle('');
//             setAddDreamTxt('');
//             setInterpretation('');
//             setInterpretationFetched(false);
//             setInterpretDream(false);
//         }
//         else{
//             setInterpretDream(true);
//             await fetchData();
//             setInterpretationFetched(true);
//         }
//     }

//     const deleteDream=async(id)=>{
//         console.log(id);
//         try {
//             // Send a POST request to your server-side endpoint with the username and password
//             const response = await axios.delete(`http://localhost:8080/api/dreams/${id}`,{withCredentials:true});
//             console.log(response.data); // Assuming the server returns some data upon successful signup
//             if (response.data==="success"){
//                 console.log("deleted");
//                 setFetchDataUpdate(a=>a+1);
//             }
//             // setSignupSuccess(true);
//           } catch (error) {
//             console.error('Error signing up:', error);
//             // Handle errors, e.g., display an error message to the user
//           }
//     }

//     const makePublic=async(id)=>{

//         console.log(id);
//         try {
//             // Send a POST request to your server-side endpoint with the username and password
//             const response = await axios.post(`http://localhost:8080/api/public/${id}`,dreamPublic,{withCredentials:true});
//             console.log(response.data); // Assuming the server returns some data upon successful signup
//             if (response.data==="success"){
//                 console.log("ADDED check DB");
//                 setFetchDataUpdate(a=>a+1);
//             }
//             // setSignupSuccess(true);
//           } catch (error) {
//             console.error('Error signing up:', error);
//             // Handle errors, e.g., display an error message to the user
//           }

//         setDreamPublic(!dreamPublic)
//     }



//     return (
//         <>
//             <div className='user-dreams-container'>
//                 {userDreams.map((dream, index) => {
//                     return <div className='user-dream' key={index}>
//                         <div className='user-dream-header'>
//                             <div className='user-dream-title-container'>
//                                 <p className='user-dream-title'>{dream.title}</p>
//                                 <p className='user-dream-date'>{dream.date}</p>
//                             </div>
//                             <div className={dreamPublic ? 'user-dream-public' : 'user-dream-private'} onClick={() => {makePublic(dream._id)}}>
//                                 {!dreamPublic ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                                     <path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523
//                                     3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM5
//                                     12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17Z"></path>
//                                 </svg> :
//                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                                     <path d="M6.23509 6.45329C4.85101 7.89148 4 9.84636 4 12C4 16.4183 7.58172 20 12 20C13.0808 20 14.1116 19.7857
//                                     15.0521 19.3972C15.1671 18.6467 14.9148 17.9266 14.8116 17.6746C14.582 17.115 13.8241 16.1582 12.5589 14.8308C12.2212
//                                     14.4758 12.2429 14.2035 12.3636 13.3943L12.3775 13.3029C12.4595 12.7486 12.5971 12.4209 14.4622 12.1248C15.4097
//                                     11.9746 15.6589 12.3533 16.0043 12.8777C16.0425 12.9358 16.0807 12.9928 16.1198 13.0499C16.4479 13.5297 16.691
//                                     13.6394 17.0582 13.8064C17.2227 13.881 17.428 13.9751 17.7031 14.1314C18.3551 14.504 18.3551 14.9247 18.3551
//                                     15.8472V15.9518C18.3551 16.3434 18.3168 16.6872 18.2566 16.9859C19.3478 15.6185 20 13.8854 20 12C20 8.70089
//                                     18.003 5.8682 15.1519 4.64482C14.5987 5.01813 13.8398 5.54726 13.575 5.91C13.4396 6.09538 13.2482 7.04166
//                                     12.6257 7.11976C12.4626 7.14023 12.2438 7.12589 12.012 7.11097C11.3905 7.07058 10.5402 7.01606 10.268
//                                     7.75495C10.0952 8.2232 10.0648 9.49445 10.6239 10.1543C10.7134 10.2597 10.7307 10.4547 10.6699 10.6735C10.59
//                                     10.9608 10.4286 11.1356 10.3783 11.1717C10.2819 11.1163 10.0896 10.8931 9.95938 10.7412C9.64554 10.3765
//                                     9.25405 9.92233 8.74797 9.78176C8.56395 9.73083 8.36166 9.68867 8.16548 9.64736C7.6164 9.53227 6.99443
//                                     9.40134 6.84992 9.09302C6.74442 8.8672 6.74488 8.55621 6.74529 8.22764C6.74529 7.8112 6.74529 7.34029
//                                     6.54129 6.88256C6.46246 6.70541 6.35689 6.56446 6.23509 6.45329ZM12 22C6.47715 22 2 17.5228 2 12C2
//                                     6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"></path>
//                                 </svg>}
//                             {dreamPublic ? 'Public' : 'Private'}</div>
//                             <div className='user-dream-delete' onClick={() =>deleteDream(dream._id)}>
//                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                                     <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772
//                                     7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
//                                 </svg>
//                             </div>
//                         </div>
//                         <p className='user-dream-txt'>{dream.dream}</p>
//                         <p className='user-dream-txt'>{dream.meaning}</p>
//                     </div>
//                 })}
//             </div>
//             {props.addDream && <div className='add-dream-overlay'>
//             <div className='user-add-dream'>
//                     <div className='user-dream-delete' onClick={() => {props.dreamAdded(); setAddDreamTxt(''); setInterpretation('');
//                     setInterpretationFetched(false); setInterpretDream(false);}}>
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                             <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772
//                             7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
//                         </svg>
//                     </div>
//                     {interpretDream && !interpretationFetched ? 
//                     <svg className='interpreting' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                         <linearGradient id="star-gradient-two" x1="0%" y1="0%" x2="100%" y2="0%">
//                             <stop offset="0%" stopColor="#4daae5" />
//                             <stop offset="100%" stopColor="#fc2f7e" />
//                         </linearGradient>
//                         <path fill="url(#star-gradient-two)" d="M17.0007 1.20825 18.3195 3.68108 20.7923 4.99992 18.3195 6.31876 17.0007 8.79159 15.6818 6.31876 13.209
//                         4.99992 15.6818 3.68108 17.0007 1.20825ZM8.00065 4.33325 10.6673 9.33325 15.6673 11.9999 10.6673 14.6666 8.00065
//                         19.6666 5.33398 14.6666.333984 11.9999 5.33398 9.33325 8.00065 4.33325ZM19.6673 16.3333 18.0007 13.2083 16.334
//                         16.3333 13.209 17.9999 16.334 19.6666 18.0007 22.7916 19.6673 19.6666 22.7923 17.9999 19.6673 16.3333Z"></path>
//                     </svg> : <textarea className={interpretationFetched ? 'dream-interpretation-text' : 'add-dream-txt'} placeholder="Type your dream here..." value={interpretationFetched ? interpretation : addDreamTxt}
//                     onChange={(e) => {if(!interpretationFetched) {setAddDreamTxt(e.target.value)}}}/>}
//                     {(!interpretDream || (interpretDream && interpretationFetched)) ? <div className='add-dream-save' onClick={handleSaveDream}>{interpretDream ? 'Save' : 'Interpret'}
//                         {interpretDream ? 
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                             <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
//                         </svg> :
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                             <linearGradient id="star-gradient-one" x1="0%" y1="0%" x2="100%" y2="0%">
//                                 <stop offset="0%" stopColor="#4daae5" />
//                                 <stop offset="100%" stopColor="#fc2f7e" />
//                             </linearGradient>
//                             <path fill="url(#star-gradient-one)" d="M12 0.5L16 8L23.5 12L16 16L12 23.5L8 16L0.5 12L8 8L12 0.5Z"></path>
//                         </svg>}
//                     </div> : <></>}
//                 </div>
//             </div>}
//         </>
//       )
//     }
    

// //   return (
// //     <div className='user-dreams-container'>
// //         {userDreams.map((dream, index) => {
// //             return <div className='user-dream' key={index}>
// //                 <div className='user-dream-header'>

// //                     <div className='user-dream-title-container'>
// //                         <p className='user-dream-title'>{dream.title}</p>
// //                         <p className='user-dream-date'>{dream.date}</p>
// //                     </div>
// //                     <div className={dreamPublic ? 'user-dream-public' : 'user-dream-private'} onClick={() => {setDreamPublic(!dreamPublic)}}>
// //                         {!dreamPublic ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
// //                             <path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523
// //                             3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM5
// //                             12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17Z"></path>
// //                         </svg> :
// //                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
// //                             <path d="M6.23509 6.45329C4.85101 7.89148 4 9.84636 4 12C4 16.4183 7.58172 20 12 20C13.0808 20 14.1116 19.7857
// //                             15.0521 19.3972C15.1671 18.6467 14.9148 17.9266 14.8116 17.6746C14.582 17.115 13.8241 16.1582 12.5589 14.8308C12.2212
// //                             14.4758 12.2429 14.2035 12.3636 13.3943L12.3775 13.3029C12.4595 12.7486 12.5971 12.4209 14.4622 12.1248C15.4097
// //                             11.9746 15.6589 12.3533 16.0043 12.8777C16.0425 12.9358 16.0807 12.9928 16.1198 13.0499C16.4479 13.5297 16.691
// //                             13.6394 17.0582 13.8064C17.2227 13.881 17.428 13.9751 17.7031 14.1314C18.3551 14.504 18.3551 14.9247 18.3551
// //                             15.8472V15.9518C18.3551 16.3434 18.3168 16.6872 18.2566 16.9859C19.3478 15.6185 20 13.8854 20 12C20 8.70089
// //                             18.003 5.8682 15.1519 4.64482C14.5987 5.01813 13.8398 5.54726 13.575 5.91C13.4396 6.09538 13.2482 7.04166
// //                             12.6257 7.11976C12.4626 7.14023 12.2438 7.12589 12.012 7.11097C11.3905 7.07058 10.5402 7.01606 10.268
// //                             7.75495C10.0952 8.2232 10.0648 9.49445 10.6239 10.1543C10.7134 10.2597 10.7307 10.4547 10.6699 10.6735C10.59
// //                             10.9608 10.4286 11.1356 10.3783 11.1717C10.2819 11.1163 10.0896 10.8931 9.95938 10.7412C9.64554 10.3765
// //                             9.25405 9.92233 8.74797 9.78176C8.56395 9.73083 8.36166 9.68867 8.16548 9.64736C7.6164 9.53227 6.99443
// //                             9.40134 6.84992 9.09302C6.74442 8.8672 6.74488 8.55621 6.74529 8.22764C6.74529 7.8112 6.74529 7.34029
// //                             6.54129 6.88256C6.46246 6.70541 6.35689 6.56446 6.23509 6.45329ZM12 22C6.47715 22 2 17.5228 2 12C2
// //                             6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"></path>
// //                         </svg>}
// //                     {dreamPublic ? 'Public' : 'Private'}</div>
// //                     <div className='user-dream-delete' onClick={()=> deleteDream(dream._id)}>
// //                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
// //                             <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772
// //                             7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
// //                         </svg>
// //                     </div>
// //                 </div>
// //                 <p className='user-dream-txt'>{dream.dream}</p>
// //             </div>
// //         })}
// //         {props.addDream && <div className='user-add-dream'>
// //             <div className='user-add-dream-header'>
// //                 <div className='user-dream-title-container'>
// //                     <input className='add-dream-title' type='text' placeholder='Title' value={addDreamTitle} onChange={(e) => {setAddDreamTitle(e.target.value)}}></input>
// //                     <p className='user-dream-date'>{currentDate.getDate() + ' / ' + month + ' / ' + year}</p>
// //                 </div>
// //                 <div className='user-dream-delete' onClick={props.dreamAdded}>
// //                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
// //                         <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772
// //                         7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
// //                     </svg>
// //                 </div>
// //             </div>
// //             <textarea className='add-dream-txt' placeholder="Write your dream" value={addDreamTxt} onChange={(e) => {setAddDreamTxt(e.target.value)}}/>
// //             <div className='add-dream-save' onClick={handleSaveDream}>Save
// //                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
// //                     <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
// //                 </svg>
// //             </div>
// //         </div>}
// //     </div>
// //   )
// // }


import './css/MyDreams.css'
import React, { useState,useEffect } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import html2pdf from 'html2pdf.js';
import { hover } from '@testing-library/user-event/dist/hover';
import { useNavigate } from 'react-router-dom';

export default function MyDreams(props) {
    const navigate=useNavigate();

    const [interpretation, setInterpretation] = useState('');
    const token = localStorage.getItem('token');

    const genAI = new GoogleGenerativeAI(
        "AIzaSyA6en_TH0AN2QrFktirj51uLTrxXkz8gAE"
    );
    const fetchData = async () => {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = 'Interpret this dream, and provide just the interpretation text: ' + addDreamTxt;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setInterpretation(text);
      };

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const [isSaving, setIsSaving] = useState(false);
    const [fetchDataUpdate,setFetchDataUpdate]=useState(1);
    const [userDreams, setUserDreams] = useState([]);
    const [addDreamTxt, setAddDreamTxt] = useState('');
    const [interpretDream, setInterpretDream] = useState(false);
    const [interpretationFetched, setInterpretationFetched] = useState(false);
    const [switchToInterpretation, setSwitchToInterpretation] = useState([]);


    // useEffect(() => {
    //     // Make an API call to fetch user data from the backend
    //     const fetchUserData = async () => {
    //         try {
    //             // Send a POST request to your server-side endpoint with the username and password
    //             const response = await axios.get("http://localhost:8080/api/showdreams",{withCredentials:true});
    //             console.log(response.data); // Assuming the server returns some data upon successful signup
    //             if (response.data){
    //                 console.log("returned");
    //                 setUserDreams(response.data);
    //             }
    //             // setSignupSuccess(true);
    //           } catch (error) {
    //             console.error('Error signing up:', error);
    //             if (error.response && error.response.status === 401) {
    //                 alert(error.response.data.message);
    //                 navigate("/login");
                    
    //             }
    //             else{
    //                 alert("An error occurred while fetching user data.");
    //             }
    //             // Handle errors, e.g., display an error message to the user
    //           }
    //     };
        
    //     fetchUserData();
    // },[fetchDataUpdate]);
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get("http://localhost:8080/api/dreams/showdreams", {
            headers: {
                    'Authorization': `Bearer ${token}`
                },
              withCredentials: true
            });
            console.log(response)
            if (response.data.success === true) {
              setUserDreams(response?.data.data);
            }
          } catch (error) {
            // Handle network errors or other exceptions
            // alert(error.response.data.message);
            // navigate("/login");
          }
        };
      
        fetchUserData();
      }, [fetchDataUpdate]);
      




    const generateTitle = async () => {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = 'Generate a short title for this dream, choose the title from the text provided: ' + addDreamTxt;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text
    }


    const handleSaveDream = async() => {
        if (isSaving) return;
        setIsSaving(true)
        if(interpretationFetched) {
            let newDream = {
                title: await generateTitle(),
                dream: addDreamTxt,
                meaning:interpretation,
                public: false,
                date: currentDate.getDate() + ' / ' + month + ' / ' + year
            };
            try {
                // Send a POST request to your server-side endpoint with the username and password
                const response = await axios.post("http://localhost:8080/api/dreams",newDream,{headers: {
                    'Authorization': `Bearer ${token}`
                  },withCredentials:true});
                console.log(response.data); // Assuming the server returns some data upon successful signup
                if (response.data==="success"){
                    console.log("inserted");
                    setFetchDataUpdate(a=>a+1);
                    setIsSaving(false);
                }
                // setSignupSuccess(true);
              } catch (error) {
                console.error('Error signing up:', error);
                setIsSaving(false);
                // Handle errors, e.g., display an error message to the user
              }


            // setUserDreams([...userDreams, newDream]);
            props.dreamAdded();
            // setAddDreamTitle('');
            setAddDreamTxt('');
            setInterpretation('');
            setInterpretationFetched(false);
            setInterpretDream(false);
        }
        else{
            setInterpretDream(true);
            await fetchData();
            setInterpretationFetched(true);
            setIsSaving(false);
        }
    }

    const deleteDream=async(id)=>{
        console.log(id);
        try {
            // Send a POST request to your server-side endpoint with the username and password
            const response = await axios.delete(`http://localhost:8080/api/dreams/${id}`,{headers: {
                'Authorization': `Bearer ${token}`
              },withCredentials:true});
            console.log(response.data); // Assuming the server returns some data upon successful signup
            if (response.data==="success"){
                console.log("deleted");
                setFetchDataUpdate(a=>a+1);
            }
            // setSignupSuccess(true);
          } catch (error) {
            console.error('Error signing up:', error);
            // Handle errors, e.g., display an error message to the user
          }
    }

    const makePublic=async(dream)=>{
        if(!dream.public)
        {
        console.log(dream);
        try {
            const response = await axios.post(`http://localhost:8080/api/dreams/public/${dream._id}`,{}, {headers: {
                'Authorization': `Bearer ${token}`
              },withCredentials:true});
            console.log(response.data); // Assuming the server returns some data upon successful signup
            if (response.data==="dream made public"){
                console.log("ADDED check DB");
                setFetchDataUpdate(a=>a+1);
            }
        }
        catch (error) {
            console.error('Error signing up:', error);
    }
}
else{
    try{
        const response=await axios.delete(`http://localhost:8080/api/dreams/public/${dream._id}`,{headers: {
            'Authorization': `Bearer ${token}`
          },withCredentials:true});
        if(response.data)
            {
                setFetchDataUpdate(a=>a+1);
            }

    }
    catch(err){
        console.log(err);
    }
}
}

const handleDownload=async(dream)=>{
    const generateHTMLContent= (dream)=>{
        return `
        <h2>${dream.date}</h2>
        <div><b>Dream: </b>${dream.dream}</div>
        <br>
        <div><b>Interpretation: </b>${dream.meaning}</div>`
    };
        const htmlContent = generateHTMLContent(dream);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        document.body.appendChild(tempDiv);
        const opt = {
            margin: 1,
            filename: `${dream.title}`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
        };

        // Generate PDF and remove the temporary content
        html2pdf().set(opt).from(tempDiv).save().then(() => {
            document.body.removeChild(tempDiv);
        }).catch(error => {
            console.error('Error generating PDF:', error);
        });
}

const handleLike = async(dream) =>{
    const id = dream._id
    console.log(id)
    console.log(dream)
    if (dream.like ===0){
        console.log("we are here")
    }
    try{
        const response = await axios.patch(`http://localhost:8080/api/dreams/${id}/like`, id, {headers: {
            'Authorization': `Bearer ${token}`
          },withCredentials:true})
    }
    catch (error) {
        console.error('Error signing up:', error);
}
}

const handleDislike = async(dream) =>{
    const id = dream._id
    console.log(id)
    console.log(dream)
    if (dream.dislike === 0){
        console.log("we are here")
    }
    try{
        const response = await axios.patch(`http://localhost:8080/api/dreams/${id}/dislike`, id, {headers: {
            'Authorization': `Bearer ${token}`
          },withCredentials:true})
    }
    catch (error) {
        console.error('Error signing up:', error);
}
}

    return (
        <>
            <div className='user-dreams-container'>
                {userDreams?.map((dream) => {
                    return <div className='user-dream' key={dream._id}>
                        <div className='colored-hover-effect' onClick={() => {
                        const ItemIndex = switchToInterpretation.findIndex(item => item === dream._id);
                        if (ItemIndex === -1) {
                            setSwitchToInterpretation([...switchToInterpretation, dream._id])
                        } else {
                          const newList = [...switchToInterpretation];
                          newList.splice(ItemIndex, 1);
                          setSwitchToInterpretation(newList);
                        }
                        }}></div>
                        <div className='user-dream-header'>
                            <div className='user-dream-title-container'>
                                <p className='user-dream-title'>{dream.title}</p>
                                <p className='user-dream-date'>{dream.date}</p>
                                <div className='svg-cont'>
                                <span className='user-dream-txt'><svg className='dream-svgs' id='dream-svg-one' onClick={() => handleDownload(dream)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10H18L12 16L6 10H11V3H13V10ZM4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19Z"></path></svg></span>
                                <span className='user-dream-txt'><svg className='dream-svgs' id='dream-svg-two' onClick={() => handleLike(dream)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 8.99997H5V21H2C1.44772 21 1 20.5523 1 20V9.99997C1 9.44769 1.44772 8.99997 2 8.99997ZM7.29289 7.70708L13.6934 1.30661C13.8693 1.13066 14.1479 1.11087 14.3469 1.26016L15.1995 1.8996C15.6842 2.26312 15.9026 2.88253 15.7531 3.46966L14.5998 7.99997H21C22.1046 7.99997 23 8.8954 23 9.99997V12.1043C23 12.3656 22.9488 12.6243 22.8494 12.8658L19.755 20.3807C19.6007 20.7554 19.2355 21 18.8303 21H8C7.44772 21 7 20.5523 7 20V8.41419C7 8.14897 7.10536 7.89462 7.29289 7.70708Z"></path></svg></span>
                                <span className="user-dream-txt"><svg className='dream-svgs' id='dream-svg-three' onClick={() => handleDislike(dream)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 15H19V3H22C22.5523 3 23 3.44772 23 4V14C23 14.5523 22.5523 15 22 15ZM16.7071 16.2929L10.3066 22.6934C10.1307 22.8693 9.85214 22.8891 9.65308 22.7398L8.8005 22.1004C8.3158 21.7369 8.09739 21.1174 8.24686 20.5303L9.40017 16H3C1.89543 16 1 15.1046 1 14V11.8957C1 11.6344 1.05118 11.3757 1.15064 11.1342L4.24501 3.61925C4.3993 3.24455 4.76447 3 5.16969 3H16C16.5523 3 17 3.44772 17 4V15.5858C17 15.851 16.8946 16.1054 16.7071 16.2929Z"></path></svg></span>
                                </div>
                            </div>
                            <div className={dream.public ? 'user-dream-public' : 'user-dream-private'} onClick={() => makePublic(dream)}>
                                {dream.public ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523
                                    3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM5
                                    12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17Z"></path>
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6.23509 6.45329C4.85101 7.89148 4 9.84636 4 12C4 16.4183 7.58172 20 12 20C13.0808 20 14.1116 19.7857
                                    15.0521 19.3972C15.1671 18.6467 14.9148 17.9266 14.8116 17.6746C14.582 17.115 13.8241 16.1582 12.5589 14.8308C12.2212
                                    14.4758 12.2429 14.2035 12.3636 13.3943L12.3775 13.3029C12.4595 12.7486 12.5971 12.4209 14.4622 12.1248C15.4097
                                    11.9746 15.6589 12.3533 16.0043 12.8777C16.0425 12.9358 16.0807 12.9928 16.1198 13.0499C16.4479 13.5297 16.691
                                    13.6394 17.0582 13.8064C17.2227 13.881 17.428 13.9751 17.7031 14.1314C18.3551 14.504 18.3551 14.9247 18.3551
                                    15.8472V15.9518C18.3551 16.3434 18.3168 16.6872 18.2566 16.9859C19.3478 15.6185 20 13.8854 20 12C20 8.70089
                                    18.003 5.8682 15.1519 4.64482C14.5987 5.01813 13.8398 5.54726 13.575 5.91C13.4396 6.09538 13.2482 7.04166
                                    12.6257 7.11976C12.4626 7.14023 12.2438 7.12589 12.012 7.11097C11.3905 7.07058 10.5402 7.01606 10.268
                                    7.75495C10.0952 8.2232 10.0648 9.49445 10.6239 10.1543C10.7134 10.2597 10.7307 10.4547 10.6699 10.6735C10.59
                                    10.9608 10.4286 11.1356 10.3783 11.1717C10.2819 11.1163 10.0896 10.8931 9.95938 10.7412C9.64554 10.3765
                                    9.25405 9.92233 8.74797 9.78176C8.56395 9.73083 8.36166 9.68867 8.16548 9.64736C7.6164 9.53227 6.99443
                                    9.40134 6.84992 9.09302C6.74442 8.8672 6.74488 8.55621 6.74529 8.22764C6.74529 7.8112 6.74529 7.34029
                                    6.54129 6.88256C6.46246 6.70541 6.35689 6.56446 6.23509 6.45329ZM12 22C6.47715 22 2 17.5228 2 12C2
                                    6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"></path>
                                </svg>}
                            {dream.public ? 'Public' : 'Private'}</div>
                            <div className='user-dream-delete' onClick={() =>deleteDream(dream._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772
                                    7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                                </svg>
                            </div>
                        </div>
                        <p className='user-dream-txt'>{switchToInterpretation.findIndex(item => item === dream._id) !== -1 ? dream.meaning : dream.dream}</p>
                    </div>
                })}
            </div>
            {props.addDream && <div className='add-dream-overlay'>
            <div className='user-add-dream'>
                    <div className='user-dream-delete' onClick={() => {props.dreamAdded(); setAddDreamTxt(''); setInterpretation('');
                    setInterpretationFetched(false); setInterpretDream(false);}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772
                            7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                        </svg>
                    </div>
                    {interpretDream && !interpretationFetched ? 
                    <svg className='interpreting' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <linearGradient id="star-gradient-two" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4daae5" />
                            <stop offset="100%" stopColor="#fc2f7e" />
                        </linearGradient>
                        <path fill="url(#star-gradient-two)" d="M17.0007 1.20825 18.3195 3.68108 20.7923 4.99992 18.3195 6.31876 17.0007 8.79159 15.6818 6.31876 13.209
                        4.99992 15.6818 3.68108 17.0007 1.20825ZM8.00065 4.33325 10.6673 9.33325 15.6673 11.9999 10.6673 14.6666 8.00065
                        19.6666 5.33398 14.6666.333984 11.9999 5.33398 9.33325 8.00065 4.33325ZM19.6673 16.3333 18.0007 13.2083 16.334
                        16.3333 13.209 17.9999 16.334 19.6666 18.0007 22.7916 19.6673 19.6666 22.7923 17.9999 19.6673 16.3333Z"></path>
                    </svg> : <textarea className={interpretationFetched ? 'dream-interpretation-text' : 'add-dream-txt'} placeholder="Type your dream here..." value={interpretationFetched ? interpretation : addDreamTxt}
                    onChange={(e) => {if(!interpretationFetched) {setAddDreamTxt(e.target.value)}}}/>}
                    {(!interpretDream || (interpretDream && interpretationFetched)) ? <div className={interpretDream ? 'add-dream-save-clr' : 'add-dream-save'} onClick={isSaving ? null:handleSaveDream}>{interpretDream ? 'Save' : 'Interpret'}
                        {interpretDream ? 
                        <></> :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <linearGradient id="star-gradient-one" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#4daae5" />
                                <stop offset="100%" stopColor="#fc2f7e" />
                            </linearGradient>
                            <path fill="url(#star-gradient-one)" d="M12 0.5L16 8L23.5 12L16 16L12 23.5L8 16L0.5 12L8 8L12 0.5Z"></path>
                        </svg>}
                    </div> : <></>}
                </div>
            </div>}
        </>
      )
    }
    

//   return (
//     <div className='user-dreams-container'>
//         {userDreams.map((dream, index) => {
//             return <div className='user-dream' key={index}>
//                 <div className='user-dream-header'>

//                     <div className='user-dream-title-container'>
//                         <p className='user-dream-title'>{dream.title}</p>
//                         <p className='user-dream-date'>{dream.date}</p>
//                     </div>
//                     <div className={dreamPublic ? 'user-dream-public' : 'user-dream-private'} onClick={() => {setDreamPublic(!dreamPublic)}}>
//                         {!dreamPublic ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                             <path d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523
//                             3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM5
//                             12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17Z"></path>
//                         </svg> :
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                             <path d="M6.23509 6.45329C4.85101 7.89148 4 9.84636 4 12C4 16.4183 7.58172 20 12 20C13.0808 20 14.1116 19.7857
//                             15.0521 19.3972C15.1671 18.6467 14.9148 17.9266 14.8116 17.6746C14.582 17.115 13.8241 16.1582 12.5589 14.8308C12.2212
//                             14.4758 12.2429 14.2035 12.3636 13.3943L12.3775 13.3029C12.4595 12.7486 12.5971 12.4209 14.4622 12.1248C15.4097
//                             11.9746 15.6589 12.3533 16.0043 12.8777C16.0425 12.9358 16.0807 12.9928 16.1198 13.0499C16.4479 13.5297 16.691
//                             13.6394 17.0582 13.8064C17.2227 13.881 17.428 13.9751 17.7031 14.1314C18.3551 14.504 18.3551 14.9247 18.3551
//                             15.8472V15.9518C18.3551 16.3434 18.3168 16.6872 18.2566 16.9859C19.3478 15.6185 20 13.8854 20 12C20 8.70089
//                             18.003 5.8682 15.1519 4.64482C14.5987 5.01813 13.8398 5.54726 13.575 5.91C13.4396 6.09538 13.2482 7.04166
//                             12.6257 7.11976C12.4626 7.14023 12.2438 7.12589 12.012 7.11097C11.3905 7.07058 10.5402 7.01606 10.268
//                             7.75495C10.0952 8.2232 10.0648 9.49445 10.6239 10.1543C10.7134 10.2597 10.7307 10.4547 10.6699 10.6735C10.59
//                             10.9608 10.4286 11.1356 10.3783 11.1717C10.2819 11.1163 10.0896 10.8931 9.95938 10.7412C9.64554 10.3765
//                             9.25405 9.92233 8.74797 9.78176C8.56395 9.73083 8.36166 9.68867 8.16548 9.64736C7.6164 9.53227 6.99443
//                             9.40134 6.84992 9.09302C6.74442 8.8672 6.74488 8.55621 6.74529 8.22764C6.74529 7.8112 6.74529 7.34029
//                             6.54129 6.88256C6.46246 6.70541 6.35689 6.56446 6.23509 6.45329ZM12 22C6.47715 22 2 17.5228 2 12C2
//                             6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"></path>
//                         </svg>}
//                     {dreamPublic ? 'Public' : 'Private'}</div>
//                     <div className='user-dream-delete' onClick={()=> deleteDream(dream._id)}>
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                             <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772
//                             7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
//                         </svg>
//                     </div>
//                 </div>
//                 <p className='user-dream-txt'>{dream.dream}</p>
//             </div>
//         })}
//         {props.addDream && <div className='user-add-dream'>
//             <div className='user-add-dream-header'>
//                 <div className='user-dream-title-container'>
//                     <input className='add-dream-title' type='text' placeholder='Title' value={addDreamTitle} onChange={(e) => {setAddDreamTitle(e.target.value)}}></input>
//                     <p className='user-dream-date'>{currentDate.getDate() + ' / ' + month + ' / ' + year}</p>
//                 </div>
//                 <div className='user-dream-delete' onClick={props.dreamAdded}>
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                         <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772
//                         7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
//                     </svg>
//                 </div>
//             </div>
//             <textarea className='add-dream-txt' placeholder="Write your dream" value={addDreamTxt} onChange={(e) => {setAddDreamTxt(e.target.value)}}/>
//             <div className='add-dream-save' onClick={handleSaveDream}>Save
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
//                 </svg>
//             </div>
//         </div>}
//     </div>
//   )
// }
