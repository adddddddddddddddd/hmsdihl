import React from "react";
import Card from "../components/Card";
import SignForm from "../components/SignForm";
import Nav from "../components/Nav";
import walkingman from "../assets/images/walkingman.webp";

function SignIn(props) {
  // state //////////////////////////////////////////////////////////////////////////////

  // comportement ///////////////////////////////////////////////////////////////////////

  

  //render ////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <Nav></Nav>
      <div className="w-full h-svh flex justify-center items-center">
        <div className="m-auto h-svh w-full  flex">
          <Card header={"Sign In"}>
            <div className="my-12">
              <SignForm  setIsAuthenticated={props.setIsAuthenticated} type={"Sign In"} setTargetDate={props.setTargetDate} setConnexionStatus={props.setConnexionStatus} setGoalHours={props.setGoalHours} setGoalMinutes={props.setGoalMinutes}></SignForm>
            </div>
          </Card>
          <img src={walkingman} alt="Walking man" />
        </div>
      </div>
    </>
  );
}

export default SignIn;
