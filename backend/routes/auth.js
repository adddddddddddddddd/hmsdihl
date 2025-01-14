const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const router = express.Router();
const cors = require("cors");

require("dotenv").config();

const User = require("../models/User");
const { isValidObjectId } = require("mongoose");
router.use(express.json()); //à mettre sur toute les routes à la place de bodyParser

router.use(
  cors({
    origin: ["https://hmsdihl.vercel.app/", 'http://localhost:3001'], // Le domaine du front-end
    credentials: true, // Permet d'envoyer les cookies
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"], // Permet l'en-tête Content-Type
  })
);

ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

router.get("/validate", async (req, res) => {
  const authToken = req.cookies.authToken;
  if (authToken) {
    res.status(200).send({ success: true });
  } else {
    res.status(401).send({ success: false });
  }
});
// Middleware pour protéger les routes
const authenticate = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.status(403).json({ message: "Accès interdit. prout" });

  try {
    const verified = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = verified; // Ajoute les données utilisateur au `req`
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide." });
  }
};

// Route to register a new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log("Requête reçue :", req.body);
  try {
    // Verify if the user already exist
    const isExistingUser = await User.findOne({ username });
    if (isExistingUser)
      return res.status(400).json({ message: "Nom d’utilisateur déjà pris." });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    console.log("Utilisateur enregistré avec succès.", newUser);
    res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    console.error("Erreur lors de l’enregistrement:", error); // Ajoutez ceci

    res.status(500).json({ message: "Erreur lors de l’enregistrement." });
  }
});

// Connexion route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Requête reçue :", req.body);
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé." });

    // Vérifie le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Mot de passe incorrect." });

    // Génère un token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    // Envoie le token dans un cookie (httpOnly pour éviter XSS)
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", //process.env.NODE_ENV === "production", // Assurez-vous que secure est activé en prod
      maxAge: 3600000, // 1 heure
      sameSite: "Lax", // Permet d'envoyer le cookie dans des contextes cross-origin
    });

    res.status(200).json({ message: "Connexion réussie." });
  } catch (error) {
    console.error("erreur de login,", error);
    res.status(500).json({ message: "Erreur lors de la connexion." });
  }
});

// Route protégée pour récupérer "steps"
router.get("/steps", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé." });

    res.status(200).json({ steps: user.steps });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des données.", error });
  }
});

// Route protégée pour mettre à jour "steps"
router.post("/steps", authenticate, async (req, res) => {
  const { steps } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé." });

    user.steps = steps; // Met à jour la variable
    await user.save();

    res
      .status(200)
      .json({ message: "Steps mis à jour avec succès.", steps: user.steps });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour." });
  }
});

// Route de logout
router.post("/logout", (req, res) => {
  // Supprime le cookie authToken
  res.clearCookie("authToken", {
    httpOnly: true, // Assurez-vous que les options correspondent à la configuration initiale
    secure: process.env.NODE_ENV === "production", // Utilisez 'secure' en production
    sameSite: "Lax",
  });

  res.status(200).json({ message: "Déconnexion réussie" });
});
module.exports = router;
