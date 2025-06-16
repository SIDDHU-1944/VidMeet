import { useContext, useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from "@mui/material/IconButton";


export default function History(){

    let routeTo = useNavigate();
    let [meetings, setMeetings]= useState([]);
    let {getHistoryOfUser} = useContext(AuthContext);

    useEffect(()=>{
        let fetchHistory= async()=>{
            try{
                const history = await getHistoryOfUser();
                setMeetings(history);
                console.log(history);
            }catch(e){

            }
        }
        fetchHistory();
    }, [])

    let formDate = (dataString)=>{
        const date= new Date(dataString);
        const day = date.getDate().toString().padStart(2,"0");
        const month= (date.getMonth()+1).toString().padStart(2,"0");
        const year= date.getFullYear();

        return `${day}/${month}/${year}`
    }

    return (
        <>
            <IconButton onClick={()=>{routeTo('/home')}}>
                <HomeIcon/>
            </IconButton>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">{
                    (meetings && meetings.length!==0) ? meetings.map((meeting,idx)=>{
                        return(
                            <CardContent key={idx}>
                                <Typography gutterBottom sx={{ color: 'text.secondary', fontWeight: "bold"}}>
                                    Code: {meeting.meetingCode}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                    Date: {formDate(meeting.date)}
                                </Typography>
                                <hr />
                            </CardContent>
                            
                        )
                    })    : <></>
                }</Card>
            </Box>
        </>
    );
}