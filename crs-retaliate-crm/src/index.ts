import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyAJGpXbEXhVqmlic3yl_xWxURqTH4waCsE",
  authDomain: "retaliate-crm.firebaseapp.com",
  databaseURL: "https://retaliate-crm-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "retaliate-crm",
  storageBucket: "retaliate-crm.firebasestorage.app",
  messagingSenderId: "463943028770",
  appId: "1:463943028770:web:4886048de689f9f0ef7a7b",
  measurementId: "G-HDDX6MD2HB"
};

const app = initializeApp(firebaseConfig);

// 👇 Use your reCAPTCHA site key here
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LfZRGErAAAAALXVT8tTr9IG-7U7yryf7OT6vZaB'),
  isTokenAutoRefreshEnabled: true
});
