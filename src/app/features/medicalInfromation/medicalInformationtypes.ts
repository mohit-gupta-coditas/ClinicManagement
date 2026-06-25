import z from "zod";

export const ZMedicalQuestions = z.object({
  id: z.uuid(`'id' must be a valid uuid`),
  patientId: z.uuid(`'patientId' must be a valid uuid`),
  appointmentId: z.uuid(`'appointmentId' must be a valid uuid`),
  smoker: z.coerce.boolean(`'smoker' must be either 'true' or 'false'`),
  diabetic: z.coerce.boolean(`'diabetic' must be either 'true' or 'false'`),
  alcoholConsumption: z.coerce.boolean(`'alcoholConsumption' must be either 'true' or 'false'`),
  oldDiseaseDescription: z.string().trim().min(1).optional(),
  createdAt: z.date(`'createdAt' must be a valid date`),
  updatedAt: z.date(`'updatedAt' must be a valid date`)
});

export type MedicalQuestions = z.infer<typeof ZMedicalQuestions>;