// const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth.js")
const connectFitBitRoutes = require("./routes/connectfitbit.js");
const dataRoutes = require("./routes/data.js")
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require('cors');



const uri = process.env.MONGO_URI;

const app = express();
const PORT = 3000;
// app.use(bodyParser.json()); //bodyParser est obsolète, on utilisera plutôt app.use(express.json());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001', // Le domaine du front-end
  credentials: true, // Permet d'envoyer les cookies
  methods: ['GET', 'POST',"PUT","DELETE"],
  allowedHeaders: ['Content-Type'], // Permet l'en-tête Content-Type
}));
app.set("trust proxy", 1)

app.use(cookieParser())


mongoose
  .connect(uri)
  .then(() => {
    console.log("Connecté à MongoDB Atlas !");
  })
  .catch((err) => {
    console.error("Erreur de connexion à MongoDB Atlas :", err);
  });



// Routes
app.use('/auth', authRoutes);
app.use('/connectfitbit', connectFitBitRoutes)
app.use('/data', dataRoutes)


app.listen(PORT, () => {
  console.log(`Serveur Express en écoute sur http://localhost:${PORT}`);
});
