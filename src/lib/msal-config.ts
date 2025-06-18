
import { LogLevel, PublicClientApplication, type Configuration } from "@azure/msal-browser";

// IMPORTANT: Replace these placeholder values with your Azure AD App Registration details.
const MSAL_CLIENT_ID = "YOUR_CLIENT_ID_HERE"; // Application (client) ID from Azure AD
const MSAL_TENANT_ID = "YOUR_TENANT_ID_HERE"; // Directory (tenant) ID from Azure AD
const MSAL_REDIRECT_URI = typeof window !== 'undefined' ? window.location.origin : "http://localhost:9002"; // Or your production redirect URI

if (MSAL_CLIENT_ID === "YOUR_CLIENT_ID_HERE" || MSAL_TENANT_ID === "YOUR_TENANT_ID_HERE") {
  console.warn(
    "MSAL Configuration Incomplete: Please update MSAL_CLIENT_ID and MSAL_TENANT_ID in src/lib/msal-config.ts with your Azure AD App Registration details for Microsoft authentication to work."
  );
}

export const msalConfig: Configuration = {
  auth: {
    clientId: MSAL_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${MSAL_TENANT_ID}`,
    redirectUri: MSAL_REDIRECT_URI, // Must match a Redirect URI in your Azure AD app registration
    postLogoutRedirectUri: typeof window !== 'undefined' ? window.location.origin : "/", // Optional: Where to redirect after logout
  },
  cache: {
    cacheLocation: "sessionStorage", // "localStorage" for persistence across browser sessions, "sessionStorage" for current session
    storeAuthStateInCookie: false, // Set to true for IE11 or if using cookies for state
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            // console.info(message); // Too verbose for most cases
            return;
          case LogLevel.Verbose:
            // console.debug(message); // Too verbose
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
      piiLoggingEnabled: false, // Set to true ONLY for debugging, never in production
      logLevel: LogLevel.Warning, // Adjust as needed: Error, Warning, Info, Verbose
    },
    allowNativeBroker: false, // Disables WAM Broker
  },
};

// Define the scopes (permissions) your application needs for Microsoft Graph or other APIs.
// User.Read and profile are common for basic sign-in and user info.
// Add Teams-specific scopes if you intend to interact with Teams data via Graph API.
export const loginRequest = {
  scopes: ["User.Read", "profile", "openid", "offline_access"] 
  // Example Teams scopes (add if needed): "Team.ReadBasic.All", "ChannelMessage.Send"
};

// Instance of PublicClientApplication that can be imported by your components
export const msalInstance = new PublicClientApplication(msalConfig);
