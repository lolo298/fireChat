import express, { Express, Request, Response, NextFunction } from "express";
import { createServer as createViteServer } from "vite";
import { readFile } from "fs/promises";
import { apiRoutes } from "./routes/api.ts";
async function createServer() {
  const app: Express = express();

  const vite = await createViteServer({
    server: {
      middlewareMode: true
    },
    appType: "custom",
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "/src/styles/index.scss";`
        }
      }
    }
  });

  app.use(vite.middlewares);
  app.use(express.static("public"));
  //use the api routes

  app.use("/api", apiRoutes);

  app.get("*", async (req: Request, res: Response, next: NextFunction) => {
    try {
      let template = await readFile("./index.html", "utf-8");

      let html = await vite.transformIndexHtml(req.url, template);

      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");

      const appHtml = await render(req.url);

      html = html.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.get("*.(js|ts|jsx|tsx)", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const url = req.originalUrl;
      const result = await vite.ssrLoadModule(url);
      const code = result.code;
      res.status(200).set({ "Content-Type": "application/javascript" }).end(code);
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(5173);
  console.log("Server running at http://localhost:5173");
}

createServer();
