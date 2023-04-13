import { Express, Router } from "express";

const apiRouter = Router();

apiRouter.get("/users", async (req, res) => {
  const usersRes = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await usersRes.json();
  res.status(200).json(users);
});

apiRouter.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await userRes.json();
  res.status(200).json(user);
});

export { apiRouter as apiRoutes };
