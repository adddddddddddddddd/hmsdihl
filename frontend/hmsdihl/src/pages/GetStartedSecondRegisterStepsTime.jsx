import React, { useState } from "react";
import Nav from "../components/Nav";
import Card from "../components/Card";
import SignForm from "../components/SignForm";
import TimeForm from "../components/TimeForm";
import StepsForm from "../components/StepsForm";
import Button from "../components/Button";

function GetStartedSecondRegisterStepsTime(props) {
  // state ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [stepsDataFromChild, setStepsDataFromChild] = useState(undefined);

  // comportement /////////////////////////////////////////////////////////////////////////////////////////////////////

  // const handleClickSubmitGetStartedTwo = async () => {
  //   alert("handleClickSubmitGetStartedTwo");
  //   if(!stepsDataFromChild){
  //     console.log("steps pas rentrés",props.steps )
  //   }else if(!timeDataFromChild){
  //     console.log("temps pas rentré",  props.goalHours, props.goalMinutes)
  //   }else{
  //     console.log(props.goalHours, props.goalMinutes, props.steps)
  //     window.location.href="/dashboard"
  //   }
  // };
  // render ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <div className="h-svh w-full flex items-center  ">
        

        <div className="flex justify-between w-[45%] m-auto items-center">
          <StepsForm
            setStepsDataFromChild={setStepsDataFromChild}
            setSteps={props.setSteps}
            steps={props.steps}
            isStepsFormInGetStarted={true}
            setDisplayTimeForm ={undefined}
          ></StepsForm>
          <p className="text-center  font-bold font-inter ">
          Give me your daily steps goal 👟 
        </p>
          {/* <TimeForm
            setTimeDataFromChild={setTimeDataFromChild}
            goalHours={props.goalHours}
            goalMinutes={props.goalMinutes}
            setGoalHours={props.setGoalHours}
            setGoalMinutes={props.setGoalMinutes}
          ></TimeForm> */}
        </div>
      </div>
    </div>
  );
}

export default GetStartedSecondRegisterStepsTime;
