import { NextApiRequest, NextApiResponse } from "next";
import { User, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { set as setData, ref as dbRef } from "firebase/database";
import { auth, db } from "@utils/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password, password2, email } = req.body;
  if (password !== password2) {
    return res.status(400).json({ success: false, message: "Passwords do not match" });
  }

  try {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credentials.user, { displayName: username });
    await createDbUser(credentials.user);
    return res
      .status(200)
      .json({ success: true, message: "User created", id: credentials.user.displayName });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}

async function createDbUser(user: User) {
  const uid = user.uid;
  const username = user.displayName;
  const email = user.email;
  const profile_picture = user.photoURL;
  try {
    await setData(dbRef(db, `users/${uid}`), {
      username,
      email,
    });
  } catch (error) {
    return error;
  }
  return true;
}
