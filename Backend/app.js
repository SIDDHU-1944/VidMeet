import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import path from "path"

import mongoose from "mongoose";
import { connectToSocket } from "./src/controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./src/routes/users.routes.js";

dotenv.config();

// console.log("ENV loaded:", Object.keys(process.env)); for debugging whther .env is loaded

const app= express();
const server=createServer(app);
const io= connectToSocket(server);
const __dirname =path.resolve();

app.set("port", process.env.PORT || 8000);//set the port form env variables(sometimes set by vercel, netlify etc) or default 8000
app.use(cors());// to allow cross-origin requests
app.use(express.json({limit: "40kb"}));// to parse json with a limit of 40kb to avoid heavy payloads
app.use(express.urlencoded({limit: "40kb", extended: true}));//to parse urlencoded data
app.use(express.static(path.join(__dirname, "../client/build")));

app.use("/api/v1/users", userRoutes);
// app.use("/api/v2/users", newUserRoutes);


app.get("/", (req,res)=>{
    res.json({
        message: "Hello World"
    });
})

// to counter not found when reloaded
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const start = async () =>{
    try{
        // console.log(process.env.MONGO_URI);
        const connectiondb =await mongoose.connect(process.env.MONGO_URI);
        console.log(`connected to MongoDB Host: ${connectiondb.connection.host}`);
    }catch(err){
        console.error('Error connecting to MongoDB',err)
    }


    server.listen(8000, () => {
        console.log("server is running on port 8000");
    })
}

start();
