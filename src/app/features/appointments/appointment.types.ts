import z from "zod";

export const ZAppointment = z.object({
  id: z.uuid(`'id' must be a valid uuid`),
  patientId: z.uuid(`'patientId' must be a valid uuid`),
  clinicianId: z.uuid(`'clinicianId' must be a valid uuid`),
  visitReason: z.string(`'visitReason' must be a valid string.`),
  status: z.enum(['intakePending' , 'intakeCompleted' , 'checkedIn' , 'inProgress' , 'completed']),
  clinicalSummary: z.string(`'clinicalSummary' must be a valid string`),
  appointmentDate: z.iso.date(`'appointmentDate must be a valid date`),
  startTime: z.iso.time(`'startTime' must be a valid time.`),
  endTime: z.iso.time(`'endTime' must be a valid time`),
  createdAt: z.date(`'createdAt' must be a valid date`),
  updatedAt: z.date(`'updatedAt' must be a valid date`)
});

export type Appointment = z.infer<typeof ZAppointment>;


export const ZAppointmentOptions = z.object({
  patientId: z.uuid(`'patientId' must be a valid uuid`).optional(),
  clinicianId: z.uuid(`'clinicianId' must be a valid uuid`).optional(),
  status: z.enum(['intakePending' , 'intakeCompleted' , 'checkedIn' , 'inProgress' , 'completed']).optional(),
  appointmentDate: z.iso.date(`'appointmentDate must be a valid date`),
  startTime: z.iso.time(`'startTime' must be a valid time.`).optional(),
  endTime: z.iso.time(`'endTime' must be a valid time`).optional(),
  limit: z.coerce.number(`'limit' must be a valid number `).default(10),
  offset: z.coerce.number(`'offset' must be a valid number`).default(0),
  sortBy: z.string(`'sortBy' must be a valid column name`).default('startTime'),
  orderBy: z.enum(['ASC', 'DESC']).default('ASC')
});

export type AppointmentOptions = z.infer<typeof ZAppointmentOptions>;