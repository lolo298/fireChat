import { NextApiRequest, NextApiResponse } from "next/types";
import { auth } from "@utils/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, send the user data back to the client
      res.status(200).json({ user });
    } else {
      // User is signed out, send null back to the client
      res.status(200).json({ user: null });
    }
  });
}
