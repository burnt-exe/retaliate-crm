<<<<<<< HEAD
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
=======
// Firebase Functions v2
import { onCall, HttpsError } from "firebase-functions/v2/https";
// Import types for request and auth context
import type { CallableRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

// Ensure Firebase Admin SDK is initialized
if (admin.apps.length === 0) {
  admin.initializeApp();
}

// Define the expected data structure for the input from the client
interface SetUserRoleData {
  email: string; // Expect an email to identify the user
  role: string;  // Expect a role to assign
}

// Define the structure of the response (optional but good practice)
interface SetUserRoleResult {
  message: string;
  email?: string;
  role?: string;
}

export const setUserRole = onCall<SetUserRoleData, Promise<SetUserRoleResult>>(async (request: CallableRequest<SetUserRoleData>): Promise<SetUserRoleResult> => {
  // Access authentication context via request.auth
  // request.auth is of type AuthData | undefined (AuthData contains uid, token, etc.)
  if (request.auth?.token.admin !== true) {
    // Check if the caller has an 'admin' custom claim set to true
    console.log('Permission denied: Caller is not an admin.', request.auth?.uid);
    throw new HttpsError('permission-denied', 'Must be an administrative user to set custom claims.');
  }

  // Access data sent from the client via request.data
  const { email, role } = request.data;

  if (!email || !role) {
    console.log('Invalid arguments: Missing email or role.', request.data);
    throw new HttpsError('invalid-argument', 'The function must be called with "email" and "role" in the data payload.');
  }

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { role: role });
    console.log(`Successfully set role '${role}' for user ${email} (UID: ${user.uid})`);
    return { message: `Success! ${email} has been made a ${role}.`, email: email, role: role };
  } catch (error: any) {
    console.error("Error setting custom claims for", email, ":", error);
    if (error.code === 'auth/user-not-found') {
      throw new HttpsError('not-found', `User with email ${email} not found.`);
    }
    // For other errors, throw a generic internal error
    throw new HttpsError('internal', 'An unexpected error occurred while setting the user role.', error.message);
  }
});

// If you have other functions in this file, ensure they also follow the correct
// Firebase Functions v1 or v2 syntax as appropriate.
>>>>>>> 5d0978c (fix this raydo@cloudshell:~/retaliate-crm (retaliate-crm-23sxo)$ cd func)
