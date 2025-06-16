import React from "react";
import "../App.css";
import NavBar from "../components/navbar/NavBar";
import LandingMain from "../components/landingMain/LandingMain";

export default function LandingPage(){
    return (
        <div className="LandingPageContainer">
            <NavBar/>
            <LandingMain/>
        </div>
    )
}
