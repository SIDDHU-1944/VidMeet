import styles from './HomeMain.module.css';
import IconButton from "@mui/material/IconButton";
import KeyboardIcon from '@mui/icons-material/Keyboard';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import Divider from '@mui/material/Divider';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export default function HomeMain(){
    let routeTo = useNavigate();

    let [meetingCode, setMeetingCode] = useState("");

    let {addToHistory} = useContext(AuthContext);

    let handleJoinVideoCall = async()=>{
        await addToHistory(meetingCode);
        routeTo(`/${meetingCode}`)
    }
    let handleNew = ()=>{
        routeTo("/");
    }
    return (
        <div className={styles.HomeMainContainer}>
            <div className={styles.leftPanel}>
                <h1>Video Calls and Meetings for everyone</h1>
                <h3>Stay Connected from anywhere and anytime</h3>
                <div className={styles.buttons}>
                    <button className={styles.NewMeeting} onClick={handleNew}>
                        <span><VideoCallOutlinedIcon style={{fontSize: "2.5rem", color:"white"}}/></span>
                        <span>New Meeting</span>
                    </button>
                    <p style={{color:"white"}}>Or</p>
                    <div className={styles.code}>
                        <KeyboardIcon style={{color: "grey"}}/>
                        <input type="text" placeholder='Enter meeting code' onChange={(e)=>{setMeetingCode(e.target.value)}}/>
                        <button className={styles.join} onClick={handleJoinVideoCall}><span><GroupsIcon/></span>Join</button>
                    </div>
                    
                </div>
            </div>
            <div className={styles.rightPanel}>
                <img src="./rightpanel1.jpg" alt="conferenece img"/>
            </div>
            
        </div>
    )
}