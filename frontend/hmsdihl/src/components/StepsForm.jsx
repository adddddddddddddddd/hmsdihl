import React from "react";
import Card from "./Card";
import Button from "./Button";

function StepsForm(props) {
  //state/////////////////////////////////////////////////////////

  const handleStepsChange = (event) => {
    props.setSteps(event.target.value);
  };
  const handleStepsInputChange = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://hmsdihl-api.onrender.com/data/steps", {
        method: "PUT", // ou "PUT" selon l'action souhaitée
        headers: {
          "Content-Type": "application/json", // Indique que les données sont en JSON
        },
        credentials: "include",
        body: JSON.stringify({ steps: props.steps }), // Convertit les données en JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Données enregistrées :", data);
        if(props.isStepsFormInDashboard){
          props.setDisplayStepsForm(false)

        }
        if (props.isStepsFormInGetStarted){
          
          window.location.href = "/getstarted3"
        }
      } else {
        console.error("Erreur lors de l'envoi :", response.status);
      }
    } catch (error) {
      console.error("Erreur réseau ou serveur :", error);
    }
  };
  //comportement /////////////////////////////////////////////////////////////::

  // render /////////////////////////////////////////////////////////////////:
  return (
    <div className={`${props.styleStepsForm}`}>
      <Card
        header={"Combien de pas voulez-vous faire par jour?"}
        stylehdiw={"z-50 font-inter p-5"}
      >
        <form onSubmit={handleStepsInputChange}>
          <input
            className="my-10 w-full font-bold text-center rounded-xl h-20 text-4xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            onChange={handleStepsChange}
            value={`${props.steps}`}
          />
          <Button
            bgColor={`bg-primary text-background hover:text-text hover:bg-background`}
            onClick={handleStepsInputChange}
          >
            {" "}
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default StepsForm;
