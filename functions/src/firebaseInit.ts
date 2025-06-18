
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyAN2yom7vytXr0STfX6A-82-yZQN8aE3C0",
  authDomain: "retaliate-crm-23sxo.firebaseapp.com",
  projectId: "retaliate-crm-23sxo",
  storageBucket: "retaliate-crm-23sxo.firebasestorage.app",
  messagingSenderId: "758450519185",
  appId: "1:758450519185:web:75944fe42f5e6872b31330",
  measurementId: "G-JDF0ZVZHPG"
};

const app = initializeApp(firebaseConfig);

// Initialize App Check
// Ensure you have enabled App Check for your project in the Firebase console
// and registered your reCAPTCHA v3 keys there.
// The key "758450519185-5koei4r8cciojbv8eo9p948s7uh6597g.apps.googleusercontent.com"
// appears to be a reCAPTCHA v3 Site Key or an OAuth Client ID derived from your project number.
// For ReCaptchaV3Provider, you typically use your reCAPTCHA v3 Site Key.
if (typeof window !== 'undefined') {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
      "758450519185-5koei4r8cciojbv8eo9p948s7uh6597g.apps.googleusercontent.com"
    ),
    isTokenAutoRefreshEnabled: true,
  });
} else {
  console.warn("Skipping App Check initialization in non-browser environment (firebaseInit.ts). This file seems intended for client-side usage.");
}


export default app;
