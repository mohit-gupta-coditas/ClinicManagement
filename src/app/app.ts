import express from "express";
import { env } from "../validate.env.js";
import { createServer } from "node:http";
import { Server} from "socket.io";
import { connectToPG } from "./connections/pg.connection.js";
import { registerMiddlewares } from "./routes/route.js";
import { connectToRedis } from "./connections/redis.connection.js";
import { cronScheduler } from "./utils/cron.helper.js";
import { DateTime } from "luxon";
import { connectToSocket } from "./socket/socket.js";

export const startServer = async () => {
  try {
    const app = express();
    
    await connectToPG();
    await connectToRedis();
    registerMiddlewares(app);

    cronScheduler();

    const httpServer = createServer(app);

    const io = new Server(httpServer);

    await connectToSocket(io);

    httpServer.listen(
      env.PORT,
      () => {
        console.log(`Server started on PORT : ${env.PORT}`);
      }
    );
    
  } catch(err) {
    process.nextTick(() => process.exit(1));
  }
}