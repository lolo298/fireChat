import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@utils/firebaseServer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uid } = req.query;
  const snap = await db
    .collection("messages")
    .doc(uid as string)
    .get();
  const messages = snap.data();
  console.log("messages", messages);
  res.status(200).json(messages);
}
