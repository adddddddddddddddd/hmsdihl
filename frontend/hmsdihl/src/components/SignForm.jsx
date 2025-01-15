import { useState, useEffect } from "react";
import FormInputText from "./FormInputText";
import Button from "./Button";
import ClosingCross from "./ClosingCross";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function SignForm(props) {
  //state
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  //comportement
  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isEmail(data.username)) {
      alert("It does not seems to be an e-mail");
    } else {
      console.log("Données envoyées :", data);

      if (props.type === "Sign In") {
        var endpoint = "login";
      } else if (props.type === "Sign Up") {
        endpoint = "register";
      }

      try {
        const response = await fetch(
          `https://hmsdihl-api.onrender.com/auth/${endpoint}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Important si le backend utilise des cookies
            body: JSON.stringify(data),
          }
        );
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
      if (props.type === "Sign In") {
        try {
          const response = await fetch(
            "https://hmsdihl-api.onrender.com/data/time",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json", // Indique que les données sont en JSON
              },
              credentials: "include",
            }
          );
          if (response.ok) {
            props.setIsAuthenticated(true);
            const data = await response.json();
            console.log("Données reçues :", data);
            const newDate = new Date(data.time);
            props.setGoalHours(newDate.getHours());
            props.setGoalMinutes(newDate.getMinutes());
            props.setTargetDate(newDate);
            props.setConnexionStatus(true);
            return <Navigate to="/dashboard" />;
          } else {
            console.error("Erreur lors de l'envoi :", response.status);
          }
        } catch (error) {
          console.error("Erreur réseau ou serveur :", error);
        }
      }
      console.log("form submitted");
    }
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
  //render
  return (
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
        {props.type}
      </Button>
    </form>
  );
}

export default SignForm;
