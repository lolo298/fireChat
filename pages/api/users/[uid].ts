import { NextApiRequest, NextApiResponse } from "next/types";
import { auth } from "@utils/firebaseServer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uid } = req.query;
  const user = await auth.getUser(uid as string);
  const data = {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
  };
  res.status(200).json(data);
}
