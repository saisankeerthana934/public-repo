// In server/config/passport.js

// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const mongoose = require('mongoose');

// // Get our User model (from the file you just created)
// const User = mongoose.model('users');

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then(user => {
//     done(null, user);
//   });
// });

// // This is the main configuration
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: 'http://localhost:8000/auth/google/callback', // Full URL
//       proxy: true
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       // Check if this user already exists in our database
//       const existingUser = await User.findOne({ googleId: profile.id });

//       if (existingUser) {
//         // We already have a user, so just return them
//         return done(null, existingUser);
//       }
      
//       // This is a new user, so create them in our database
//       const newUser = await new User({
//         googleId: profile.id,
//         displayName: profile.displayName,
//         email: profile.emails[0].value,
//         image: profile.photos[0].value
//       }).save();
      
//       done(null, newUser);
//     }
//   )
// );
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;


// Serializing
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

// Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) return done(null, existingUser);
      const newUser = await new User({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value,
        image: profile.photos?.[0]?.value
      }).save();
      done(null, newUser);
    }
  )
);

// GitHub
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/auth/github/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ githubId: profile.id });
      if (existingUser) return done(null, existingUser);
      const newUser = await new User({
        githubId: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value,
        image: profile.photos?.[0]?.value
      }).save();
      done(null, newUser);
    }
  )
);
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/auth/linkedin/callback',
      scope: ['r_emailaddress', 'r_liteprofile'],
      state: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ linkedinId: profile.id });
      if (existingUser) return done(null, existingUser);
      const newUser = await new User({
        linkedinId: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value,
        image: profile.photos?.[0]?.value
      }).save();
      done(null, newUser);
    }
  )
);
// Twitter
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: 'http://localhost:8000/auth/twitter/callback',
      includeEmail: true,
      proxy: true
    },
    async (token, tokenSecret, profile, done) => {
      const existingUser = await User.findOne({ twitterId: profile.id });
      if (existingUser) return done(null, existingUser);
      const newUser = await new User({
        twitterId: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value,
        image: profile.photos?.[0]?.value
      }).save();
      done(null, newUser);
    }
  )
);
