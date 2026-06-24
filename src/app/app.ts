import express from "express";
import { env } from "../validate.env.js";
import { connectToPG } from "./connections/pg.connection.js";
import { registerMiddlewares } from "./routes/route.js";
import { connectToRedis } from "./connections/redis.connection.js";

export const startServer = async () => {
  try {
    const app = express();

    await connectToPG();
    await connectToRedis();
    registerMiddlewares(app);

    app.listen(
      env.PORT,
      () => {
        console.log(`Server started at PORT : ${env.PORT}`);
      }
    )
  } catch(err) {
    process.nextTick(() => process.exit(1));
  }
}