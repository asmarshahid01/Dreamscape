import './css/MyDreams.css'
import React, { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function MyDreams(props) {

    const [interpretation, setInterpretation] = useState('');

    const genAI = new GoogleGenerativeAI(
        "AIzaSyD5iwBsMJ6XToRsgT0tO4P4_4ty0fSo4So"
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

    const [dreamPublic, setDreamPublic] = useState([]);
    const [userDreams, setUserDreams] = useState([]);
    const [addDreamTxt, setAddDreamTxt] = useState('');
    const [interpretDream, setInterpretDream] = useState(false);
    const [interpretationFetched, setInterpretationFetched] = useState(false);
    const [switchToInterpretation, setSwitchToInterpretation] = useState([]);

    const generateTitle = async () => {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = 'Generate a short title for this dream, choose the title from the text provided: ' + addDreamTxt;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text
    }

    const handleSaveDream = async () => {
        if(interpretationFetched) {
                let newDream = {
                    title: await generateTitle(),
                    dream: addDreamTxt,
                    meaning: interpretation,
                    public: false,
                    date: currentDate.getDate() + ' / ' + month + ' / ' + year
                };
                setUserDreams([...userDreams, newDream]);
                props.dreamAdded();
                setAddDreamTxt('');
                setInterpretation('');
                setInterpretationFetched(false);
                setInterpretDream(false);
        } else {
            setInterpretDream(true);
            await fetchData();
            setInterpretationFetched(true);
        }
    }

  return (
    <>
        <div className='user-dreams-container'>
            {userDreams.map((dream, index) => {
                return <div className='user-dream' key={index}>
                    <div className='colored-hover-effect' onClick={() => {
                        const ItemIndex = switchToInterpretation.findIndex(item => item === index);
                        if (ItemIndex === -1) {
                            setSwitchToInterpretation([...switchToInterpretation, index])
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
                        </div>
                        <div className={dreamPublic.findIndex(item => item === index) !== -1 ? 'user-dream-public' : 'user-dream-private'} onClick={() => {
                            const ItemIndex = dreamPublic.findIndex(item => item === index);
                            if (ItemIndex === -1) {
                                setDreamPublic([...dreamPublic, index])
                            } else {
                              const newList = [...dreamPublic];
                              newList.splice(ItemIndex, 1);
                              setDreamPublic(newList);
                            }
                        }}>
                            {dreamPublic.findIndex(item => item === index) === -1 ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
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
                        {dreamPublic.findIndex(item => item === index) !== -1 ? 'Public' : 'Private'}</div>
                        <div className='user-dream-delete' onClick={() => {
                            let updatedDreams = userDreams.filter(item => item.title !== dream.title);
                            setUserDreams(updatedDreams);}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772
                                7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                            </svg>
                        </div>
                    </div>
                    <p className='user-dream-txt'>{switchToInterpretation.findIndex(item => item === index) !== -1 ? dream.meaning : dream.dream}</p>
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
                {(!interpretDream || (interpretDream && interpretationFetched)) ? <div className={interpretDream ? 'add-dream-save-clr' : 'add-dream-save'} onClick={handleSaveDream}>{interpretDream ? 'Save' : 'Interpret'}
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
