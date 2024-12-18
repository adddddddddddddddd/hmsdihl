import React, { useState } from "react";
import Button from "../components/Button";
import TimeForm from "../components/TimeForm";

function GetStartedThirdPage(props) {
  // state
  const [timeDataFromChild, setTimeDataFromChild] = useState(undefined);

  //comportement

  //render
  return (
    <div>
      <div className="h-svh w-full flex items-center  ">
        <div className="flex justify-between w-[45%] m-auto items-center">
          <p className="text-center  font-bold font-inter ">
            Give me the time you want your <br /> steps done 🛏️...
          </p>
          <TimeForm
            // isTimeFormInGetStarted={true}
            setTimeDataFromChild={setTimeDataFromChild}
            goalHours={props.goalHours}
            goalMinutes={props.goalMinutes}
            setGoalHours={props.setGoalHours}
            setGoalMinutes={props.setGoalMinutes}
            setTime={props.setTime}
            isTimeFormInGetStarted={true}
          ></TimeForm>
        </div>
      </div>
    </div>
  );
}

export default GetStartedThirdPage;
