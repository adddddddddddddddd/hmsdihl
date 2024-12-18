import React from "react";
import Button from "./Button";
import { useState } from "react";
import HowDoesItWork from "../components/HowDoesItWork";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Nav() {
  //state/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [displayHowDoesItWork, setDisplayHowDoesItWork] = useState(false);
  //comportements/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleHowDoesItWorkClick = () => {
    setDisplayHowDoesItWork(true);
  };
  const handleHowDoesItWorkBackgroundClick = () => {
    setDisplayHowDoesItWork(false);
  };
  //render/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <div className="flex flex-col relative items-center z-50">
        <div className="bg-background w-full h-20 flex justify-between items-center px-48 fixed">
          <div className="flex items-center px-4">
            <Link to="/">
              <h1 className="text-3xl text-text font-bold hover:bg-accent duration-200 hover:cursor-pointer p-2 rounded-xl">
                HMSDIHL{" "}
              </h1>
            </Link>
          </div>
          <div className="flex">
            <Button
              text={"text-text"}
              onClick={handleHowDoesItWorkClick}
              buttonHoverInfo={"hover:text-primary text-center"}
            >
              How does it work
            </Button>
            <Link to="/about">
              {" "}
              <Button
                text={"text-text"}
                buttonHoverInfo={"hover:text-primary "}
              >
                About
              </Button>
            </Link>
            <Link to="/signin">
              <Button
                bgColor={"bg-secondary-100"}
                text={"text-text"}
                buttonHoverInfo={"hover:mt-2 hover:mb-4 "}
              >
                Sign in
              </Button>
            </Link>
            <Link to="/getstarted1">
              <Button
                bgColor={"bg-primary"}
                text={"text-bg-background"}
                buttonHoverInfo={
                  " hover:bg-primary hover:shadow-primary hover:shadow-2xl hover:mt-2 hover:mb-4"
                }
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 w-3/4 h-px bg-text rounded-full"></div>
      </div>
      {displayHowDoesItWork ? (
        <div>
          <HowDoesItWork></HowDoesItWork>
          <div
            onClick={handleHowDoesItWorkBackgroundClick}
            className="bg-background w-full h-svh opacity-65 absolute z-10 hover:cursor-pointer"
          ></div>
        </div>
      ) : null}
    </div>
  );
}

export default Nav;
