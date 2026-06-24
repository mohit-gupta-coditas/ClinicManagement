import {config} from "dotenv";
config();

const module = await import('./app/app.js');
await module.startServer();