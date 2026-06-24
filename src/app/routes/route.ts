import { json, type Application, type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import { routes } from "./route.data.js";
import { ResponseHandler } from "../utils/response.handler.js";


export const registerMiddlewares = (app: Application) => {
  try {
    app.use(helmet());
    app.use(json());

    for(const route of routes) {
      app.use(route.path, route.router);
    }

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(err.statusCode || 500).send(new ResponseHandler(null, err));
    });

  } catch(err) {
    throw err;
  }
}