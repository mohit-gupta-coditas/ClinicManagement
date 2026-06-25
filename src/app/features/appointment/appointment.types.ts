import z from "zod";

export const ZAppointment = z.object({
  id: z.uuid(`'id' must be a valid uuid`),
  patientId: z.uuid(`'patientId' must be a valid uuid`),
  clinicianId: z.uuid(`'clinicianId' must be a valid uuid`),
  visitReason: z.string(`'visitReason' must be a valid string.`),
  status: z.enum(['intakePending' , 'intakeCompleted' , 'checkedIn' , 'inProgress' , 'completed']),
  clinicalSummary: z.string(`'clinicalSummary' must be a valid string`),
  appointmentDate: z.date(`'appointmentDate must be a valid date`),
  startTime: z.iso.time(`'startTime' must be a valid time.`),
  endTime: z.iso.time(`'endTime' must be a valid time`),
  createdAt: z.date(`'createdAt' must be a valid date`),
  updatedAt: z.date(`'updatedAt' must be a valid date`)
});

export type Appointment = z.infer<typeof ZAppointment>;
