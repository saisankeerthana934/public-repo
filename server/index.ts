const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

interface OAuthProviderConfig {
  clientID?: string;
  clientSecret?: string;
  callbackURL: string;
  consumerKey?: string;          // Twitter
  consumerSecret?: string;       // Twitter
  [key: string]: any;
}

interface UnifiedOAuthConfig {
  google?: OAuthProviderConfig;
  github?: OAuthProviderConfig;
  linkedin?: OAuthProviderConfig;
  twitter?: OAuthProviderConfig;
}

function unifiedOAuth(config: UnifiedOAuthConfig) {
  // Google
  if (config.google) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: config.google.clientID,
          clientSecret: config.google.clientSecret,
          callbackURL: config.google.callbackURL,
        },
        (accessToken: string, refreshToken: string, profile: any, done: any) => {
          done(null, profile);
        }
      )
    );
  }
  // GitHub
  if (config.github) {
    passport.use(
      new GithubStrategy(
        {
          clientID: config.github.clientID,
          clientSecret: config.github.clientSecret,
          callbackURL: config.github.callbackURL,
        },
        (accessToken: string, refreshToken: string, profile: any, done: any) => {
          done(null, profile);
        }
      )
    );
  }
  // LinkedIn
  if (config.linkedin) {
    passport.use(
      new LinkedInStrategy(
        {
          clientID: config.linkedin.clientID,
          clientSecret: config.linkedin.clientSecret,
          callbackURL: config.linkedin.callbackURL,
          scope: ['r_emailaddress', 'r_liteprofile'],
          state: true,
        },
        (accessToken: string, refreshToken: string, profile: any, done: any) => {
          done(null, profile);
        }
      )
    );
  }
  // Twitter
  if (config.twitter) {
    passport.use(
      new TwitterStrategy(
        {
          consumerKey: config.twitter.consumerKey,
          consumerSecret: config.twitter.consumerSecret,
          callbackURL: config.twitter.callbackURL
        },
        (token: string, tokenSecret: string, profile: any, done: any) => {
          done(null, profile);
        }
      )
    );
  }
  return passport;
}

module.exports = unifiedOAuth;
