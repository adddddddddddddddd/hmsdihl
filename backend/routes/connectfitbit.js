const express = require("express");
const router = express.Router();
const https = require("https");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const querystring = require("querystring"); // Pour formater les données POST
require("dotenv").config();
const cors = require("cors");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const FITBIT_AUTH_URL = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=activity`;

router.use(
  cors({
    origin: "http://localhost:3001", // Le domaine du front-end
    credentials: true, // Permet d'envoyer les cookies
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"], // Permet l'en-tête Content-Type
  })
);

router.get("/", (req, res) => {
  // Redirige l'utilisateur vers Fitbit pour qu'il s'authentifie et autorise l'accès
  res.redirect(FITBIT_AUTH_URL);
});

router.get("/callback", async (req, res) => {
  try {
    const authorizationCode = req.query.code;

    if (!authorizationCode) {
      return res.status(400).send("Code d'autorisation manquant.");
    }
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).send("Token JWT manquant.");
    }

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const userId = decoded.id;

    // Préparation des données POST
    const postData = querystring.stringify({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      redirect_uri: REDIRECT_URI,
      code: authorizationCode,
    });

    const options = {
      hostname: "api.fitbit.com",
      port: 443,
      path: "/oauth2/token",
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const data = await new Promise((resolve, reject) => {
      const request = https.request(options, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          if (response.statusCode === 200) {
            resolve(data);
          } else {
            reject(new Error(`Erreur d'API Fitbit : ${data}`));
          }
        });
      });

      request.on("error", (error) => {
        reject(new Error(`Erreur réseau : ${error.message}`));
      });

      request.write(postData);
      request.end();
    });

    const tokens = JSON.parse(data);
    const { access_token, refresh_token, expires_in } = tokens;
    const tokenExpiresAt = new Date(Date.now() + expires_in * 1000)
    // Mise à jour de l'utilisateur
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fitbit: {
          accessToken: access_token,
          refreshToken: refresh_token,
          tokenExpiresAt: tokenExpiresAt,
          steps: null,
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send("Utilisateur non trouvé.");
    }

    console.log("Tokens Fitbit enregistrés avec succès.");
    res.redirect(`http://localhost:3001/dashboard?success=true`);
  } catch (error) {
    console.error("Erreur :", error.message);
    res.status(500).send("Erreur lors du traitement de la demande.");
  }
});

router.get("/user/fitbitinformations", async (req, res) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).send("Token JWT manquant.");
    }
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      accessToken: user.fitbit.accessToken,
      refreshToken: user.fitbit.refreshToken,
      tokenExpiresAt: user.fitbit.tokenExpiresAt,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des données.", error });
  }
});

// Route to get the daily steps for a user
router.get("/user/steps", async (req, res) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).send("Token JWT manquant.");
    }

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status();

    // Check if the access token is expired
    // if (
    //   !user.fitbit.tokenExpiresAt ||
    //   new Date() >= user.fitbit.tokenExpiresAt
    // ) {
    //   console.log("Token expired. Refreshing...");
    //   // Refresh the token if expired
    //   await refreshFitbitToken(user);
    // }

    // Use the access token to fetch steps data from Fitbit API
    const options = {
      hostname: "api.fitbit.com",
      port: 443,
      path: "/1/user/-/activities/steps/date/today/1d.json", // Fitbit endpoint to get today's steps
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.fitbit.accessToken}`, // Use the current valid access token
      },
    };

    https
      .get(options, (fitbitRes) => {
        let data = "";
        fitbitRes.on("data", (chunk) => {
          data += chunk;
        });

        fitbitRes.on("end", async () => {
          if (fitbitRes.statusCode === 200) {
            const stepsData = JSON.parse(data);
            const steps = stepsData["activities-steps"][0]?.value || 0;
            console.log("Fitbit-steps", steps);
            // Update the user's steps in the database
            user.fitbit.steps = steps;
            await user.save();

            res.status(200).json({ message: "Steps updated successfully", steps });
          } else {
            res
              .status(fitbitRes.statusCode)
              .json({ message: "Error from Fitbit API", details: data });
          }
        });
      })
      .on("error", (error) => {
        res
          .status(500)
          .json({ message: "Error retrieving steps", error: error.message });
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
