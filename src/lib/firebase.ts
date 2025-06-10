
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

// Check for API Key FIRST and provide a very clear warning if missing.
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.error(
    'CRITICAL ERROR: Firebase API Key (NEXT_PUBLIC_FIREBASE_API_KEY) is not defined in your environment variables. ' +
    'Firebase will NOT work. ' +
    '1. Ensure you have a .env.local file in the root of your project. ' +
    '2. Ensure NEXT_PUBLIC_FIREBASE_API_KEY="your-actual-key" is correctly set in .env.local. ' +
    '3. YOU MUST RESTART your Next.js development server after creating or modifying .env.local.'
  );
}

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

// Debugging: Log the API key being used.
// If the CRITICAL ERROR above appeared, this will likely show 'undefined'.
// If no CRITICAL ERROR, but you still get "invalid-api-key", then the key logged here is likely incorrect or from the wrong project.
console.log('Firebase Initialization: Attempting to use API Key from environment:', apiKey);

const firebaseConfig = {
  apiKey: apiKey, // This will be undefined if the env var is not set, leading to Firebase errors
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// The error "auth/invalid-api-key" originates here if firebaseConfig.apiKey is indeed invalid.
const auth: Auth = getAuth(app);

export { app, auth };

// REMINDER: Create a .env.local file in your project root and add your Firebase config:
// NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
// NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
// NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
// NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="your-measurement-id" // Optional
