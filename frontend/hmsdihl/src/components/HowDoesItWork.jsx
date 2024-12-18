import React from "react";
import Card from "./Card";
import Button from "./Button";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function HowDoesItWork() {
  return (
    <div className="h-svh flex justify-center items-center absolute m-auto w-full">
      <div className="m-auto">
        <Card header={"How does it work?"} displayInfoIcon={false} stylehdiw={"p-5 z-50 "}>
          <p className="my-5 text-sm">
            The app register your goal steps and the time of the day you want it
            done.{" "}
          </p>
          <p className="my-5 mb-7 text-sm">
            To gather steps informations, HMSDIHL needs you to install and
            connect your account to FitBit App.
          </p>
          <Link to="/getstarted1">
          <Button
            bgColor={"bg-primary"}
            text={"text-background"}
            buttonHoverInfo={
              " hover:bg-primary hover:shadow-primary hover:shadow-2xl "
            }
          >
            Get Started
          </Button></Link>
        </Card>
      </div>
    </div>
  );
}

export default HowDoesItWork;
