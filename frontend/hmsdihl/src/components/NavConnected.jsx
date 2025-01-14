import React from "react";
import Button from "./Button";

function NavConnected(props) {
  //state //////////////////////////////////////////////////////////////////////////////////////////////////////

  //comportement /////////////////////////////////////////////////////////////////////////////////////////////
  const handleClickFitBitConnect = async () => {
    const FITBIT_AUTH_URL = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=activity`;
    window.location.href = FITBIT_AUTH_URL;
  };
  const handleClickLogout = async () => {
    try {
      const response = await fetch("https://hmsdihl-api.onrender.com/auth/logout", {
        method: "POST",
        credentials: "include", // Nécessaire pour inclure les cookies dans la requête
      });

      if (response.ok) {
        console.log("Déconnexion réussie !");
        // Rediriger l'utilisateur ou nettoyer l'état de l'application
        props.setConnexionStatus(false)
        window.location.href = "/signin";
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  // render ///////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="flex flex-col relative items-center z-50">
      <div className="bg-background w-full h-20 flex justify-between items-center px-48 fixed">
        <div className="flex items-center px-4">
          <h1 className="text-3xl text-text font-bold hover:bg-accent duration-200 hover:cursor-pointer p-2 rounded-xl">
            HMSDIHL
          </h1>
        </div>
        <div className="flex">
          { !props.fitbitConnexionStatus ? <Button
            text={"text-text"}
            buttonHoverInfo={"hover:text-accent "}
            onClick={handleClickFitBitConnect}
          >
            Connect to Fitbit
          </Button>: null}
          <Button
            text={
              "text-text bg-secondary-500 hover:mt-2 hover:mb-4 text-red-500"
            }
            onClick={handleClickLogout}
          >
            Log out
          </Button>

          <Button
            bgColor={"bg-primary"}
            text={"text-text"}
            buttonHoverInfo={"hover:mt-2 hover:mb-4 "}
          >
            Dashboard
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 w-3/4 h-px bg-text rounded-full"></div>
    </div>
  );
}

export default NavConnected;
