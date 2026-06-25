import z from "zod";

export const ZAttachment = z.object({
  id: z.uuid(`'id' must be a valid uuid`),
  type: z.enum(['identification' , 'insurance card' ,'prior reports']),
  appointmentId: z.uuid(`'appointmentId' must be a valid uuid`),
  patientId: z.uuid(`'patientId' must be a valid uuid`),
  path: z.string(`'path' must be a valid string`),
  createdAt: z.date(`'createdAt' must be a valid date`),
  updatedAt: z.date(`'updatedAt' must be a valid date`)
});

export const ZAttachmentOptions = z.object({
  type: z.enum(['identification' , 'insurance card' ,'prior reports']).optional(),
  appointmentId: z.uuid(`'appointmentId' must be a valid uuid`).optional(),
  limit: z.coerce.number(`'limit' must be a valid number `).default(10),
  offset: z.coerce.number(`'offset' must be a valid number`).default(0),
  sortBy: z.string(`'sortBy' must be a valid column name`).default('path'),
  orderBy: z.enum(['ASC', 'DESC']).default('ASC')
});

export type Attachment = z.infer<typeof ZAttachment>;

export type AttachmentOptions = z.infer<typeof ZAttachmentOptions>;