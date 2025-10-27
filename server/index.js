// // Make sure this is at the VERY TOP
// require('dotenv').config(); 

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const session = require('express-session'); 
// const passport = require('passport'); 

// // --- Load our models and config ---
// require('./models/User'); 
// require('./config/passport'); 

// const app = express();

// // --- Configuration ---
// // 1. Allow your React app to make requests
// app.use(cors({
//   origin: 'http://localhost:3000', // React app's address
//   credentials: true
// }));

// // 2. MongoDB Connection
// const MONGO_URI = process.env.MONGO_URI; 
// mongoose.connect(MONGO_URI)
//   .then(() => console.log('MongoDB connected successfully.'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // 3. Session & Passport Middleware
// app.use(
//   session({
//     secret: process.env.COOKIE_KEY, // From .env
//     resave: false,
//     saveUninitialized: false
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());


// // --- Routes ---
// // 1. The Google OAuth Routes
// app.get(
//   '/auth/google',
//   passport.authenticate('google', {
//     scope: ['profile', 'email'] 
//   })
// );

// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google'),
//   (req, res) => {
//     // Login successful, send user back to React
//     res.redirect('http://localhost:3000'); 
//   }
// );

// // 2. API Routes
// app.get('/api/current_user', (req, res) => {
//   res.send(req.user); // Send back the logged-in user
// });

// app.get('/api/logout', (req, res) => {
//   req.logout((err) => {
//     if (err) { return next(err); }
//     res.redirect('http://localhost:3000');
//   });
// });

// // --- Start Server ---
// const PORT = 8000; // <-- We are using port 8000
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(session({
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// SERIALIZE / DESERIALIZE
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// ---- DEBUG LOGS ----
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CALLBACK_URL:", process.env.GOOGLE_CALLBACK_URL);
console.log("GITHUB_CLIENT_ID:", process.env.GITHUB_CLIENT_ID);
console.log("GITHUB_CALLBACK_URL:", process.env.GITHUB_CALLBACK_URL);
console.log("LINKEDIN_CLIENT_ID:", process.env.LINKEDIN_CLIENT_ID);
console.log("LINKEDIN_CALLBACK_URL:", process.env.LINKEDIN_CALLBACK_URL);
console.log("TWITTER_CONSUMER_KEY:", process.env.TWITTER_CONSUMER_KEY);
console.log("TWITTER_CALLBACK_URL:", process.env.TWITTER_CALLBACK_URL);

// GOOGLE STRATEGY
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => done(null, profile)
));

// GITHUB STRATEGY
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => done(null, profile)
));

// LINKEDIN STRATEGY
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: process.env.LINKEDIN_CALLBACK_URL,
    scope: ['r_emailaddress', 'r_liteprofile'],
    state: true
  },
  (accessToken, refreshToken, profile, done) => done(null, profile)
));

// TWITTER STRATEGY
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL
  },
  (token, tokenSecret, profile, done) => done(null, profile)
));

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- OAuth Routes ---
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect('http://localhost:3000'));

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => res.redirect('http://localhost:3000'));

app.get('/auth/linkedin', passport.authenticate('linkedin'));
app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }),
  (req, res) => res.redirect('http://localhost:3000'));

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => res.redirect('http://localhost:3000')
);

// --- API/Session Routes ---
app.get('/api/current_user', (req, res) => { res.send(req.user); });
app.get('/api/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send('Logout error');
    res.redirect('http://localhost:3000');
  });
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
