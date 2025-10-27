// In server/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  githubId: String,
  linkedinId: String,
  twitterId: String,
  // Optional:
  displayName: String,
  email: String,
  image: String
});

module.exports = mongoose.model('users', userSchema);


