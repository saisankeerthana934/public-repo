// Types for your unified-oauth npm package

// Configuration for a single provider (Google, GitHub, etc)
interface OAuthProviderConfig {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  [key: string]: any; // Allow extra options for strategy-specific stuff
}

// Complete config object for the unifiedOAuth wrapper
interface UnifiedOAuthConfig {
  google?: OAuthProviderConfig;
  github?: OAuthProviderConfig;
  linkedin?: OAuthProviderConfig;
  // Add more as you extend
}

// Standardized user data that you can return (optional for docs)
interface UnifiedOAuthUser {
  id: string;
  provider: string;
  displayName?: string;
  email?: string;
  image?: string;
}

// Error type example (optional, can be expanded)
interface UnifiedOAuthError {
  message: string;
  provider?: string;
  raw?: any;
}
