import React, { useEffect, useState } from "react";
import NavConnected from "../components/NavConnected";
import TimeForm from "../components/TimeForm";
import StepsForm from "../components/StepsForm";

function Dashboard(props) {
  // state /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [displayTimeForm, setDisplayTimeForm] = useState(false);
  const [displayStepsForm, setDisplayStepsForm] = useState(false);
  const [fitbitConnexionStatus, setFitbitConnexionStatus] = useState(false);
  // comportement /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleStepsFormClick = () => {
    setDisplayStepsForm(true);
  };
  const handleTimeFormClick = () => {
    setDisplayTimeForm(true);
  };
  const handleStepsFormBackgroundClick = () => {
    setDisplayStepsForm(false);
  };
  const handleTimeFormBackgroundClick = () => {
    setDisplayTimeForm(false);
  };
  // useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://hmsdihl-api.onrender.com/connectfitbit/user/fitbitinformations",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Inclut les cookies si nécessaire
          }
        );

        if (!response.ok) {
          console.log(response); // Déclenche une erreur manuellement
        }
        const data = await response.json();
        if (new Date(data.tokenExpiresAt) > new Date()) {
          setFitbitConnexionStatus(true);
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    };

    fetchData();
  }, [fitbitConnexionStatus, props.steps]);
  // render  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className=" h-svh  m-auto relative">
      <NavConnected
        setConnexionStatus={props.setConnexionStatus}
        fitbitConnexionStatus={fitbitConnexionStatus}
      ></NavConnected>
      {displayTimeForm ? (
        <div className="">
          <TimeForm
            setTime={props.setTime}
            goalHours={props.goalHours}
            goalMinutes={props.goalMinutes}
            setGoalHours={props.setGoalHours}
            setGoalMinutes={props.setGoalMinutes}
            setDisplayTimeForm={setDisplayTimeForm}
            isTimeFormInDashboard={true}
            styleTimeForm={
              "h-svh flex justify-center items-center absolute m-auto w-full"
            }
          ></TimeForm>
          <div
            onClick={handleTimeFormBackgroundClick}
            className="bg-background w-full h-svh opacity-65 absolute z-10 hover:cursor-pointer"
          ></div>
        </div>
      ) : null}
      {displayStepsForm ? (
        <div>
          <div className="">
            <StepsForm
              isStepsFormInDashboard={true}
              steps={props.steps}
              setSteps={props.setSteps}
              setDisplayStepsForm={setDisplayStepsForm}
              styleStepsForm={
                "h-svh flex justify-center items-center absolute m-auto w-full"
              }
            ></StepsForm>
            <div
              onClick={handleStepsFormBackgroundClick}
              className="bg-background w-full h-svh opacity-65 absolute z-10 hover:cursor-pointer"
            ></div>
          </div>
        </div>
      ) : null}
      <div className="h-20"></div>
      <div className="w-3/4 h-3/4 m-auto">
        <div className="grid grid-cols-2 grid-rows-2  h-full my-[15px] mx-10">
          <div className="bg-gradient-to-tl from-secondary-500 to-secondary-100  rounded-xl m-4 flex flex-col justify-center text-text  items-center shadow-lg hover:shadow-2xl ease-in duration-200 ">
            <p className="font-bold fixed mb-28">Bedtime:</p>
            <p
              onClick={handleTimeFormClick}
              className="text-6xl m-3 hover:bg-secondary-500 hover:opacity-50 hover:rounded-xl hover:p-2 hover:cursor-pointer"
            >
              {`${props.goalHours
                .toString()
                .padStart(2, "0")}:${props.goalMinutes
                .toString()
                .padStart(2, "0")}`}
            </p>
          </div>
          <div className="font-inter bg-gradient-to-tl from-secondary-500 to-secondary-100  rounded-xl m-4 flex flex-col justify-center text-text  items-center row-span-2 shadow-lg hover:shadow-2xl ease-in duration-200">
            <p className="font-bold fixed mb-24 font-inter">Remaining steps:</p>
            <p
              onClick={handleStepsFormClick}
              className=" font-inter text-5xl m-3 hover:bg-secondary-500 hover:opacity-50 hover:rounded-xl hover:p-2 hover:cursor-pointer"
            >
              {props.steps - props.fitbitSteps}
            </p>
          </div>
          <div className=" font-inter bg-gradient-to-tl from-secondary-500 to-secondary-100  rounded-xl m-4 flex flex-col justify-center text-text items-center shadow-lg hover:shadow-2xl ease-in duration-200">
            <p className="font-bold fixed mb-20">Fitbit connexion status:</p>
            {!fitbitConnexionStatus ? (
              <p className="text-4xl text-red-500 m-3 ">Not Connected</p>
            ) : (
              <p className="text-4xl text-primary m-3 ">Connected</p>
            )}
          </div>
          {/* emoji vert si valide sinon rouge et proposition de se connecter à fitbit*/}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
