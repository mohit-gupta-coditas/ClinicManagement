import express from "express";
import { env } from "../validate.env.js";
import { createServer } from "node:http";
import { Server, Socket } from "socket.io";
import { connectToPG } from "./connections/pg.connection.js";
import { registerMiddlewares } from "./routes/route.js";
import { connectToRedis } from "./connections/redis.connection.js";

export const startServer = async () => {
  try {
    const app = express();
    
    await connectToPG();
    await connectToRedis();
    registerMiddlewares(app);

    const httpServer = createServer(app);

    const io = new Server(httpServer);

    io.on('connection', function() {
      console.log('connection established.');
      io.emit('hello', { message: 'Hello from server!' });

      io.on('disconnect', function(){
        console.log('disconnected...');
      })
    });

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