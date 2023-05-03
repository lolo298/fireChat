import functions from "firebase-functions";
import { auth, initializeApp, credential } from "firebase-admin";
import * as dotenv from "dotenv";
dotenv.config();

initializeApp({
  credential: credential.cert({
    projectId: process.env.PROJECT_ID,
    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: process.env.CLIENT_EMAIL,
  }),
  databaseURL: "https://firechat-aa8ae-default-rtdb.europe-west1.firebasedatabase.app",
});

export const helloWorld = functions.auth.user().onCreate((user) => {
  auth().setCustomUserClaims(user.uid, { admin: true });
  console.log("user", user);
  return { data: "Hello from Firebase!" };
});
