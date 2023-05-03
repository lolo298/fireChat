import { getApps, initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, Auth, getIdTokenResult, User } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator, Database } from "firebase/database";

const fbConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(fbConfig) : getApps()[0];
const auth = getAuth(app);
const db = getDatabase(app);

startEmulators([auth, db]);

// function getAuthClient(app: FirebaseApp): Auth {
//   const auth = getAuth(app);
//   startEmulators(auth);
//   return auth;
// }
// function getDbClient(app: FirebaseApp): any {
//   const db = getDatabase(app);
//   startEmulators(db);
//   return auth;
// }
function startEmulators(sys: Sys) {
  const EMULATORS_STARTED = "EMULATORS_STARTED";
  if (process.env.NODE_ENV === "development") {
    if (!global[EMULATORS_STARTED]) {
      global[EMULATORS_STARTED] = true;
      connectEmulator(sys);
    }
  }
}
async function connectEmulator(sys: Sys) {
  const [auth, db] = sys;
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectDatabaseEmulator(db, "127.0.0.1", 9000);
}

type Sys = [Auth, Database];

async function getTokenResult(user: User) {
  const tokenRes = await getIdTokenResult(user);
  console.log("tokenRes", tokenRes);
  return tokenRes;
}

export { auth, db, getTokenResult };
