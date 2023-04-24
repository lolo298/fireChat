import { NextApiRequest, NextApiResponse } from "next";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@utils/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    res
      .status(200)
      .json({ success: true, message: "User created", id: credentials.user.displayName });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, auth: auth });
  }
}
