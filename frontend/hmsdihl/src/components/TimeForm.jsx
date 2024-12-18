import React, { useState } from "react";
import Button from "./Button";
import Card from "./Card";
import { useAsyncError } from "react-router-dom";

function TimeForm(props) {
  //state//////////////////////////////////////////////:

  // comportement///////////////////////////////////////

  const handleTimeInputChange = (event) => {
    const [hours, minutes] = event.target.value.split(":");
    props.setGoalHours(hours);
    props.setGoalMinutes(minutes);
    // props.setTimeDataFromChild(hours, minutes)
  };
  const handleSubmitTimeForm = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/data/time", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Indique que les données sont en JSON
        },
        credentials: "include",
        body: JSON.stringify({
          goalHours: props.goalHours,
          goalMinutes: props.goalMinutes,
        }), // Convertit les données en JSON
      });
      console.log()
      if (response.ok) {
        const data = await response.json();
        console.log()
        console.log("Données enregistrées :", data,props.isTimeFormInGetStarted);
        props.setTime(new Date(data.time))
        if(props.isTimeFormInDashboard){
          props.setDisplayTimeForm(false)

        }
        if (props.isTimeFormInGetStarted){
          
          window.location.href = "/getstarted4"
        }
      } else {
        console.error("Erreur lors de l'envoi :", response.status);
      }
    } catch (error) {
      console.error("Erreur réseau ou serveur :", error);
    }
  };
  //render/////////////////////////////////////////
  return (
    <div className={`${props.styleTimeForm}`}>
      <Card
        header={"À quelle heure voulez-vous avoir fait vos pas?"}
        stylehdiw={"p-5 font-inter z-50"}
      >
        <form onSubmit={handleSubmitTimeForm}>
          <input
            className="w-48 h-32 flex text-center  mt-12 mb-8 text-5xl font-inter font-bold rounded-xl"
            type="time"
            onChange={handleTimeInputChange}
            value={`${props.goalHours}:${props.goalMinutes}`}
          />
          <Button
            bgColor={`bg-primary text-background hover:text-text hover:bg-background`}
            onClick={handleSubmitTimeForm}
          >
            {" "}
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default TimeForm;
