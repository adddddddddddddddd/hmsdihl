import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FirstHomePage from "./pages/FirstHomePage";
import SignIn from "./pages/SignIn";
import GetStartedFirstSignUp from "./pages/GetStartedFirstSignUp";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import GetStartedSecondRegisterStepsTime from "./pages/GetStartedSecondRegisterStepsTime";
import GetStartedThirdPage from "./pages/GetStartedThirdPage";
import Parameters from "./pages/Parameters";
import GetStartedFourthPage from "./pages/GetStartedFourthPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  //state //////////////////////////////////////////////////////////////////////////////////////////////

  const [steps, setSteps] = useState(0);
  const [fitbitSteps, setFitbitSteps] = useState(2);
  const [goalHours, setGoalHours] = useState(0);
  const [goalMinutes, setGoalMinutes] = useState(0);
  const [targetDate, setTargetDate] = useState(new Date(9999, 11, 31));
  const [connexionStatus, setConnexionStatus] = useState(false);
  const [realTargetDate, setRealTargetDate] = useState(targetDate);
  
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  //comportement //////////////////////////////////////////////////////////////////////////////////////////:

  // useEffect()

  const getUserSteps = async () => {
    if (connexionStatus) {
      try {
        const response = await fetch("https://hmsdihl-api.onrender.com/steps", {
          method: "GET",
          credentials: "include", // on utilise des cookies à la place du token
        });
        if (!response.ok) {
          throw new Error("Échec de la requête");
        }

        const data = await response.json();
        console.log("goal steps acquired :", data);
        setSteps(data.steps);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données protégées :",
          error
        );
      }
    }
  };

  const getFitbitSteps = async () => {
    try {
      const response = await fetch(
        "https://hmsdihl-api.onrender.com/connectfitbit/user/steps",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ajustez selon vos besoins
        }
      );
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`); // Déclenche une erreur manuellement
      }
      const data = await response.json();
      setFitbitSteps(data.steps);
      console.log("fitbit steps acquired :", data);
    } catch (error) {
      console.error("Impossible de récupérer les données:", error.message);
    } finally {
      console.log("Requête terminée.");
    }
  };

  const getTargetDate = async () => {
    if (connexionStatus) {
      try {
        const response = await fetch("https://hmsdihl-api.onrender.com/data/time", {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // Indique que les données sont en JSON
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Données reçues :", data);
          const newtime = new Date(data.time);
          setTargetDate(newtime);
          setGoalHours(newtime.getHours());
          setGoalMinutes(newtime.getMinutes());
        } else {
          console.error("Erreur lors de la réception :", response.status);
        }
      } catch (error) {
        console.error("Erreur réseau ou serveur :", error);
      }
    }
  };

  const refreshRealTargetDate = async () => {
    await Promise.all([getFitbitSteps(), getUserSteps(), getTargetDate()]);
    // const updatedDate = new Date(targetDate);
    // setRemainingSteps(steps - fitbitSteps);
    // console.log(" s -fbs",steps-fitbitSteps)
    // const stepsDuration = ((steps - fitbitSteps) / 100) * 60 * 1000;
    // updatedDate.setTime(updatedDate.getTime() - stepsDuration);
    // console.log("updatedDate", updatedDate);
    // setRealTargetDate(updatedDate);
  };

  // Demander la permission de notification
  const requestNotificationPermission = async () => {
    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }
  };

  // Fonction pour envoyer une notification
  const sendNotification = (title, options) => {
    if (Notification.permission === "granted") {
      new Notification(title, options);
    } else {
      console.warn("Permission non accordée pour les notifications.");
    }
  };

  useEffect(() => {
    requestNotificationPermission();
    // getTargetDate();
    // getFitbitSteps();
    // getUserSteps();
    refreshRealTargetDate();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("FitbitSteps", fitbitSteps);
      if (connexionStatus) {
        const now = new Date();
        if (now >= realTargetDate) {
          refreshRealTargetDate();
          console.log("je rentre dans la boucle", realTargetDate);
          if (now >= realTargetDate) {
            sendNotification("HMSDIHL", {
              body: "Va marcher grosse merde",
              icon: "https://example.com/icon.png",
            });
            const updateSteps = async () => {
              try {
                const response = await fetch(
                  "https://hmsdihl-api.onrender.com/data/time",
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json", // Indique que les données sont en JSON
                    },
                    credentials: "include",
                    body: JSON.stringify({
                      goalHours: goalHours,
                      goalMinutes: goalMinutes,
                    }), // Convertit les données en JSON
                  }
                );
                if (response.ok) {
                  const data = await response.json();
                  console.log("Données enregistrées :", data);
                  setTargetDate(new Date(data.time));
                } else {
                  console.error("Erreur lors de l'envoi :", response.status);
                }
              } catch (error) {
                console.error("Erreur réseau ou serveur :", error);
              }
            };
            updateSteps(); //Next Target fonctionne, le problème vient de targetDate qui n'est pas correctement réassigné. Il est sûrement mal asigné ou réassigné plus tard
            let nextTarget = new Date(targetDate);

            nextTarget.setDate(nextTarget.getDate() + 1); // Passer au jour suivant
            setTargetDate(nextTarget);
            clearInterval(intervalId);
          }
        }
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  //render /////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Router>
      <div className="font-inter select-none"></div>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<FirstHomePage />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/signin"
          element={
            <SignIn
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
              setConnexionStatus={setConnexionStatus}
              setGoalHours={setGoalHours}
              setGoalMinutes={setGoalMinutes}
              setTargetDate={setTargetDate}
            />
          }
        />
        <Route
          path="/getstarted1"
          element={
            <GetStartedFirstSignUp
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />

        {/* Routes protégées */}
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        >
          <Route
            path="/dashboard"
            element={
              <Dashboard
                fitbitSteps={fitbitSteps}
                setConnexionStatus={setConnexionStatus}
                setTime={setTargetDate}
                setGoalHours={setGoalHours}
                setGoalMinutes={setGoalMinutes}
                steps={steps}
                setSteps={setSteps}
                goalHours={goalHours}
                goalMinutes={goalMinutes}
              />
            }
          />
          <Route
            path="/getstarted2"
            element={
              <GetStartedSecondRegisterStepsTime
                setGoalHours={setGoalHours}
                setGoalMinutes={setGoalMinutes}
                steps={steps}
                setSteps={setSteps}
                goalHours={goalHours}
                goalMinutes={goalMinutes}
              />
            }
          />
          <Route path="/parameters" element={<Parameters />} />
          <Route
            path="/getstarted3"
            element={
              <GetStartedThirdPage
                setGoalHours={setGoalHours}
                setGoalMinutes={setGoalMinutes}
                steps={steps}
                setSteps={setSteps}
                goalHours={goalHours}
                goalMinutes={goalMinutes}
                setTime={setTargetDate}
              />
            }
          />
          <Route path="/getstarted4" element={<GetStartedFourthPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
