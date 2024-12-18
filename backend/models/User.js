const mongoose = require('mongoose');

const currentDate = new Date()


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  steps: { type: Number, default: 10000 }, // 10 000 (WHO recommendation)
  time: {type: Date, default: currentDate},
  fitbit: {
        accessToken: { type: String, default: null }, // Token d'accès
        refreshToken: { type: String, default: null }, // Token de rafraîchissement
        tokenExpiresAt: { type: Date, default: null }, // Date d'expiration de l'access token
        steps: { type: Number, default: 0 } // Donnée spécifique comme les steps
    }
});

module.exports = mongoose.model('User', userSchema);
