import cron from "node-cron";
import appointmentService from "../features/appointments/appointment.service.js";

export const cronScheduler = async () => {
  try {
    cron.schedule(`*/15 * * * *`, appointmentService.schedulePendingIntakeEmail);
    console.log('CRON SCHEDULER STARTED WORKING...');
  } catch(err) {
    console.log('CRON SCHEDULER DOES NOT WORK...');
  }
}