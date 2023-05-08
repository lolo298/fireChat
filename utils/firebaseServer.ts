import admin from "firebase-admin";
import { readFileSync } from "fs";
import * as dotenv from "dotenv";
dotenv.config();

const serviceAccount = JSON.parse(readFileSync("./firechat-aa8ae-1bb49bb8f89d.json", "utf-8"));

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://firechat-aa8ae-default-rtdb.europe-west1.firebasedatabase.app",
  });
  console.log("Firebase admin initialized");
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

const auth = admin.auth();
const db = admin.firestore();

export { auth, db };
