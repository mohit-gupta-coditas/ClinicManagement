import { DateTime } from "luxon";
import { Server } from "socket.io";
import appointmentService from "../features/appointments/appointment.service.js";

export const connectToSocket = async (io: Server) => {
  try{
    io.on('connection', (socket) => {
      console.log('connection established.');


      socket.on('start', async (data) => {
        try {
          const appointements = await appointmentService.getAllAppointments({
            appointmentDate: DateTime.now().toFormat('yyyy-MM-dd'),
            limit: 10, 
            offset: 0,
            sortBy: 'startTime',
            orderBy: 'ASC'
          }, data.userId);

          io.emit('get:appointments', appointements);

        } catch(err) {
          throw err;
        }
      });

      socket.on('createappointment', async (data) => {
        try {
          await appointmentService.createAppointment(data);
          const appointements = await appointmentService.getAllAppointments({
            appointmentDate: DateTime.now().toFormat('yyyy-MM-dd'),
            limit: 10, 
            offset: 0,
            sortBy: 'startTime',
            orderBy: 'ASC'
          }, data.patientId);

          io.emit('get:appointments', appointements);
        } catch(err) {
          console.log(err);
          throw err;
        }
      })
    });
  } catch(err){
    throw err;
  }
}