import {generateText, tool} from 'ai';
import z from 'zod';
import userService from '../features/user/user.service.js';
import appointmentService from '../features/appointments/appointment.service.js';

export async function talkToAI(input: string, patientId: string) {
  const { text } = await generateText({
    model: 'openai/gpt-5',
    prompt: input + `and patientId is ${patientId}`,
    tools: {
      createAppointmentTool : tool({
        description: 'Creates an appointment for user',
        inputSchema: z.object({
          visitReason : z.string().describe('The reason for visiting the clinic'),
          clinicianName: z.string().describe('Name of the clinician in the clinic'),
          appointmentDate: z.iso.date().describe('Date of appointment in the format yyyy-MM-dd'),
          startTime: z.iso.time().describe('startTime of appointment in the format HH:mm'),
          endTime: z.iso.time().describe('endTime of appointment in the format HH:mm'),
          patientId: z.uuid().describe('Id for the current user.')
        }),
        execute: async ({visitReason, clinicianName, patientId, appointmentDate, startTime, endTime}) => {
          try {
            const clinician = await userService.getUser({name: clinicianName});

            await appointmentService.createAppointment({
              visitReason, 
              patientId,
              clinicianId: clinician.id,
              appointmentDate,
              startTime,
              endTime
            });
          } catch(err) {
            throw err;
          }
        },
      }),
    },
  });
  console.log(text);
}
