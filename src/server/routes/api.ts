/// <reference path="../../vite-env.d.ts" />
import { Express, Router } from "express";

const apiRouter = Router();

apiRouter.get("/users", async (req, res) => {
  const usersRes = await fetch("https://randomuser.me/api/?results=100");
  const users: UserResult = await usersRes.json();
  res.status(200).json(users);
});

apiRouter.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const userRes = await fetch(`https://randomuser.me/api/?seed=${id}`);
  const user: UserResult = await userRes.json();
  res.status(200).json(user);
});

export { apiRouter as apiRoutes };
