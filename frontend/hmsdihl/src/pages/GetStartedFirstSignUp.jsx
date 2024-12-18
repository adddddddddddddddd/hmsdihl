import React from "react";
import Nav from "../components/Nav";
import Card from "../components/Card";
import { useState } from "react";
import FormInputText from "../components/FormInputText";
import Button from "../components/Button";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function GetStartedFirstSignUp(props) {
  //state ////////////////////////////////////////////////////////////////////////////////////////////

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  // comportement /////////////////////////////////////////////////////////////////////////////////::
  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEmail(data.username)) {
      alert("It does not seems to be an e-mail");
    } else {
      console.log("Données envoyées :", data);
      try {
        const response = await fetch(`http://localhost:3000/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Important si le backend utilise des cookies
          body: JSON.stringify(data),
        });
        console.log(response);

        if (response.ok) {
          const result = await response.json();
          console.log("Réponse du serveur :", result);
        } else {
          console.error("Erreur lors de l’envoi des données");
        }
      } catch (error) {
        console.error("Erreur de connexion au backend :", error);
      }
      try {
        const response = await fetch(`http://localhost:3000/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Important si le backend utilise des cookies
          body: JSON.stringify(data),
        });
        console.log(response);

        if (response.ok) {
          const result = await response.json();
          console.log("Réponse du serveur :", result);
        } else {
          console.error("Erreur lors de l’envoi des données");
        }
      } catch (error) {
        console.error("Erreur de connexion au backend :", error);
      }
      window.location.href = "/getstarted2";
    }
    console.log("form submitted");
  };
  const handleFormUsernameChange = (event) => {
    const newdata = { username: event.target.value, password: data.password };
    setData(newdata);
    console.log(newdata);
  };
  const handleFormPasswordChange = (event) => {
    const newdata = { username: data.username, password: event.target.value };
    setData(newdata);
    console.log(newdata);
  };
  // render ////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <Nav></Nav>
      <div className="h-svh mx-20 ">
        <div className="m-auto h-svh w-full flex -ml-16">
          <div className="text-text flex flex-col justify-center items-center text-center w-1/2 m-auto  font-semi-bold">
            <p>
              Hello there 👋! I need to register your steps goals informations,{" "}
              <br />
              your bedtime hour and your steps. So first, you have to make an
              account!
              <br />{" "}
            </p>
            <p className="text-sm mt-5">
              To get your steps, I inform you that you will need to install
              Fitbit.
            </p>
            <p className="mt-5 text-sm">Already registered? <Link to="/signin" className="text-blue-600">Sign In</Link></p>
          </div>
          <Card header={"Sign Up"} stylehdiw={"-ml-32"}>
            <div className="my-12">
              <form className=" w-fit ">
                {/* <ClosingCross onClick={handleCrossClick}></ClosingCross> */}
                <FormInputText
                  value={data.username}
                  type="text"
                  placeholder="E-mail..."
                  onChange={handleFormUsernameChange}
                />
                <FormInputText
                  value={data.password}
                  type="password"
                  placeholder="Password..."
                  onChange={handleFormPasswordChange}
                />

                <Button
                  onClick={handleSubmit}
                  bgColor={"bg-primary"}
                  text={"text-background"}
                  buttonHoverInfo={
                    " hover:bg-primary hover:shadow-primary hover:shadow-2xl "
                  }
                >
                  Sign Up
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default GetStartedFirstSignUp;
