const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const router = express.Router();
const cors = require("cors");

require("dotenv").config();

const User = require("../models/User");
router.use(express.json()); //à mettre sur toute les routes à la place de bodyParser

router.use(
  cors({
    origin: "https://hmsdihl.vercel.app/", // Le domaine du front-end
    credentials: true, // Permet d'envoyer les cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Origin"], // Permet l'en-tête Content-Type
  })
);

router.get("/time", async (req, res) => {
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
    res.status(200).json({ time: user.time });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.put("/time", async (req, res) => {
  const { goalHours, goalMinutes } = req.body;
  const token = req.cookies.authToken;
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
    let time = new Date();
    let realTargetDate = new Date();
    const stepsDuration = ((user.steps - user.fitbit.steps) / 100) * 60 * 1000;
    realTargetDate.setHours(goalHours);
    realTargetDate.setMinutes(goalMinutes);
    realTargetDate.setTime(realTargetDate.getTime() - stepsDuration);
    console.log(realTargetDate <= time);
    if (realTargetDate <= time) {
      console.log("temps dépassé");
      const demain = new Date(time);
      demain.setDate(time.getDate() + 1);
      demain.setHours(goalHours, goalMinutes, 0, 0);
      time = demain;
    } else {
      const ojd = new Date(time);
      ojd.setHours(goalHours, goalMinutes, 0, 0);
      time = ojd;
    }
    user.time = time;
    await user.save();
    res.status(200).json({ time: user.time });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.put("/steps", async (req, res) => {
  const { steps } = req.body;
  const token = req.cookies.authToken;
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

    user.steps = steps;
    await user.save();
    res.status(200).json({ time: user.time });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
