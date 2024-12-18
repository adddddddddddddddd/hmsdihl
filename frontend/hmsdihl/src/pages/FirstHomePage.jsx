import React, { useState } from "react";
import Button from "../components/Button";
import HowDoesItWork from "../components/HowDoesItWork";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function FirstHomePage() {
  //state
  const [displayHowDoesItWork, setDisplayHowDoesItWork] = useState(false);
  //comportelent
  const handleHowDoesItWorkClick = () => {
    setDisplayHowDoesItWork(true);
  };
  const handleHowDoesItWorkBackgroundClick = () => {
    setDisplayHowDoesItWork(false);
  };
  const handleGetStartedClick = () => {
    window.location.href = "/getstarted1"
  }
  // render
  return (
    <>
    <div className="bg-background h-svh mx-20 relative ">
      <Nav></Nav>

      {displayHowDoesItWork ? (
        <div>
          <HowDoesItWork></HowDoesItWork>
          <div
            onClick={handleHowDoesItWorkBackgroundClick}
            className="bg-background w-full h-svh opacity-65 absolute z-10 hover:cursor-pointer"
          ></div>
        </div>
      ) : null}
      <div className="h-20 bg-primary"></div>
      <div className="flex mt-10">
        <div className="w-1/2 flex flex-col items-center justify-center ">
          <div className="  ml-11">
            <div className="text-left  mb-3 m-auto py-5 max-w-96">
              <p className="text-6xl text-text font-bold text-left mb-4 py-3">
                How many steps do <br /> I have left?
              </p>
              <p className=" text-text text-3xl">
                Never miss your steps goals again.{" "}
              </p>
            </div>
            <div className="flex  justify-left items-center">
              <Button
                onClick={handleHowDoesItWorkClick}
                bgColor={"bg-secondary-100"}
                text={"text-text"}
                buttonHoverInfo={"hover:mt-2 hover:mb-4 ml-0"}
                Lin
              >
                How does it work?
              </Button>
              <Button

                bgColor={"bg-primary"}
                text={"text-bg-background"}
                buttonHoverInfo={
                  " hover:bg-primary hover:shadow-primary hover:shadow-2xl hover:mt-2 hover:mb-4 "
                }
                onClick={handleGetStartedClick}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div
            className="w-4/5 rounded-xl opacity-70 aspect-square bg-secondary-100 text-9xl justify-center
flex items-center            "
          >
            👟
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>

      </>
  );
}

export default FirstHomePage;
