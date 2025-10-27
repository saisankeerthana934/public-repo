

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

interface OAuthProviderConfig {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  [key: string]: any;
}

interface UnifiedOAuthConfig {
  google?: OAuthProviderConfig;
  github?: OAuthProviderConfig;
  linkedin?: OAuthProviderConfig;
}

function unifiedOAuth(config: UnifiedOAuthConfig) {
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

  return passport;
}

module.exports = unifiedOAuth;
