import React from "react";
import Button from "../components/Button";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function GetStartedFourthPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-svh">
      <p className="text-lg text-center">
        You will have a button to connect to Fitbit on your dashboard. <br /> Since
        Fitbit is necessary for the app to work properly I'd advise you to
        configure your Fitbit account now.
      </p>
      <a
        className="text-blue-500 mt-5"
        href="https://support.google.com/fitbit/answer/14236404?hl=en#zippy=%2Chow-do-i-track-my-steps-with-fitbit-with-my-phone"
      >
        {" "}
        Check how to link your fitbit device/phone to get your steps
      </a>
      <Link to='/dashboard'><Button bgColor={`bg-primary text-background hover:bg-accent hover:text-text mt-5`}>Dashboard</Button></Link>
    </div>
  );
}

export default GetStartedFourthPage;
