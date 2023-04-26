import { auth } from "@utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";

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
