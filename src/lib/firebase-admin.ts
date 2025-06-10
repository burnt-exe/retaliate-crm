'use server';

import * as admin from 'firebase-admin';

// Configuration for Firebase Admin SDK
// Option 1 (Recommended for production): Environment Variables
//   - Set FIREBASE_SERVICE_ACCOUNT_JSON to the stringified JSON content of your service account key.
//   - OR Set GOOGLE_APPLICATION_CREDENTIALS to the absolute path of your service account key JSON file.
// Option 2 (For local development, if not using env vars): Direct Path
//   - Download your service account key JSON from Firebase Console > Project Settings > Service accounts > Firebase Admin SDK > Generate new private key.
//   - Place it in your project (e.g., at the root, or in a 'config' folder).
//   - !! IMPORTANT: Add this file to your .gitignore if you use a direct path !!
//   - Update the 'devServiceAccountPath' below if you choose this option.
const devServiceAccountPath = 'path/to/your/serviceAccountKey.json'; // REPLACE THIS if using direct path for local dev

let adminAppInstance: admin.app.App | null = null;

if (admin.apps.length === 0) {
  try {
    const serviceAccountJsonEnv = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    const googleAppCredsEnvPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const databaseURLEnv = process.env.FIREBASE_ADMIN_DATABASE_URL || "https://retaliate-crm-default-rtdb.europe-west1.firebasedatabase.app";

    let credential;

    if (serviceAccountJsonEnv) {
      const serviceAccount = JSON.parse(serviceAccountJsonEnv);
      credential = admin.credential.cert(serviceAccount);
      console.log('[Firebase Admin] Initializing using FIREBASE_SERVICE_ACCOUNT_JSON.');
    } else if (googleAppCredsEnvPath) {
      credential = admin.credential.applicationDefault(); // Uses GOOGLE_APPLICATION_CREDENTIALS path
      console.log('[Firebase Admin] Initializing using GOOGLE_APPLICATION_CREDENTIALS.');
    } else if (devServiceAccountPath !== 'path/to/your/serviceAccountKey.json') {
      // This method of requiring a dynamic path can sometimes be problematic with bundlers.
      // Ensure the path is correct and accessible.
      const serviceAccount = require(devServiceAccountPath);
      credential = admin.credential.cert(serviceAccount);
      console.log(`[Firebase Admin] Initializing using direct path: ${devServiceAccountPath}. REMEMBER TO ADD TO .gitignore.`);
    }

    if (credential) {
      adminAppInstance = admin.initializeApp({
        credential,
        databaseURL: databaseURLEnv
      });
    } else {
      console.warn(
        '[Firebase Admin] SDK NOT INITIALIZED. No valid credentials found. Configure FIREBASE_SERVICE_ACCOUNT_JSON, GOOGLE_APPLICATION_CREDENTIALS, ' +
        "or update 'devServiceAccountPath' in src/lib/firebase-admin.ts."
      );
    }
  } catch (error: any) {
    console.error('[Firebase Admin] Initialization Error:', error.message);
    if (error.code === 'MODULE_NOT_FOUND' && error.message.includes(devServiceAccountPath)) {
        console.error(`[Firebase Admin] Hint: Could not find service account file at '${devServiceAccountPath}'. Please check the path or use environment variables.`);
    }
  }
} else {
  adminAppInstance = admin.apps[0]; // Get the default app if already initialized
  // console.log('[Firebase Admin] Already initialized.');
}

export const adminAuth = adminAppInstance ? adminAppInstance.auth() : null;
export const adminDatabase = adminAppInstance ? adminAppInstance.database() : null;
// export const adminFirestore = adminAppInstance ? adminAppInstance.firestore() : null; // Uncomment if you use Firestore
export const firebaseAdminApp = adminAppInstance; // Export the app instance itself
