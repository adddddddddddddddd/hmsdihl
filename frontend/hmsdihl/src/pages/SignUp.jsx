import React from "react";
import Card from "../components/Card";
import SignForm from "../components/SignForm";
import Nav from "../components/Nav";
import walkingman from "../assets/images/walkingman.webp";

function SignUp() {
  return (
    <div className="w-full h-svh flex flex-col justify-center items-center">
      <Nav></Nav>
      <div className="m-auto h-svh w-full  flex">
        <Card header={"Sign Up"}>
          <div className="my-12">
            <SignForm type={"Sign Up"}></SignForm>
          </div>
        </Card>
        <img src={walkingman} alt="Walking man" />
      </div>
    </div>
  );
}

export default SignUp;
