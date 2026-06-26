import { DateTime } from "luxon";
import { Server } from "socket.io";

export const connectToSocket = async (io: Server) => {
  try{
    io.on('connection', (socket) => {
      console.log('connection established.');
      socket.emit(DateTime.now().toFormat('yyyy-MM-dd'), "data sent");
      socket.join(DateTime.now().toFormat('yyyy-MM-dd'));
    });
  } catch(err){
    throw err;
  }
}