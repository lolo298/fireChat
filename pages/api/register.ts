import { NextApiRequest, NextApiResponse } from "next";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@utils/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password, password2, email } = req.body;
  if (password !== password2) {
    res.status(400).json({ success: false, message: "Passwords do not match" });
    return;
  }

  try {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credentials.user, { displayName: username });
    res.status(200).json({ success: true, message: "User created", credentials: credentials });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
