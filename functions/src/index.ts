import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

export const SetupUser = functions.auth.user().onCreate(async (user) => {
  try {
    // throw new Error("This is a test error");
    await admin.auth().setCustomUserClaims(user.uid, { role: "user" });
    return { data: "success" };
  } catch (error) {
    return { data: error };
  }
});
