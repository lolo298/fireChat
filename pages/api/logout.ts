import { auth } from "@utils/firebase";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await auth.signOut();
    res.status(200).json({ success: true, message: "User signed out" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
