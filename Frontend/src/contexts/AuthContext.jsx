import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import httpStatus from "http-status";


export const AuthContext = createContext({});


const Client = axios.create({
    baseURL: "http://localhost:8000/api/v1/users"
})


export const AuthProvider = ({children})=>{
    const authContext= useContext(AuthContext);
    const [userData, setUserData] = useState(authContext);
    const router = useNavigate();

    const handleLogin = async(username, password)=>{
        try{
            let request = await Client.post("/login",{
                username: username,
                password: password
            })

            if(request.status==httpStatus.OK){
                localStorage.setItem("token", request.data.token);
                router("/home");
            }
        }catch(err){
            throw err;
        }
    }

    const handleRegister = async(name, username, email, password)=>{
        try{
            let request = await Client.post("/register",{
                name: name,
                email:email,
                username: username,
                password: password
            })
 
            if(request.status==httpStatus.CREATED){
                console.log(request.data.messages);
                router("/auth")
            }
        }catch(err){
            throw err;
        }
    }

    const getHistoryOfUser = async()=>{
        try{
            let request = await Client.get("/get_to_activity", {
                params:{
                    token: localStorage.getItem("token"),
                }
            });

            return request.data;

        }catch(e){
            throw(e);
        }
    }
    
    const addToHistory = async(meetingCode)=>{
        try{
            let request = Client.post("/add_to_activity",{
                token: localStorage.getItem('token'),
                meeting_code: meetingCode
            });

            return (await request).status
        }catch(e){
            throw(e);
        }
    }

    const data= {
        userData, setUserData, getHistoryOfUser,addToHistory, handleRegister, handleLogin
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}