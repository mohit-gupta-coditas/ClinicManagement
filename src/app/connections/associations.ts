import { AppointmentSchema } from "../features/appointments/appointment.schema.js";
import { AttachmentSchema } from "../features/attachments/attachments.schema.js";
import { MedicalQuestionsSchema } from "../features/medicalInfromation/medicalInformation.schema.js";
import { UserSchema } from "../features/user/user.schema.js";


UserSchema.hasMany(AppointmentSchema, {foreignKey: 'patientId'});
AppointmentSchema.belongsTo(UserSchema, {foreignKey: 'patientId'});

UserSchema.hasMany(AppointmentSchema, {foreignKey: 'clinicianId'});
AppointmentSchema.belongsTo(UserSchema, {foreignKey: 'clinicianId'});

UserSchema.hasMany(MedicalQuestionsSchema, {foreignKey: 'patientId'});
MedicalQuestionsSchema.belongsTo(UserSchema, {foreignKey: 'patientId'});

AppointmentSchema.hasMany(MedicalQuestionsSchema, {foreignKey: 'appointmentId'});
MedicalQuestionsSchema.belongsTo(AppointmentSchema, {foreignKey: 'appointmentId'});

UserSchema.hasMany(AttachmentSchema, {foreignKey: 'patientId'});
AttachmentSchema.belongsTo(UserSchema, {foreignKey: 'patientId'});

AppointmentSchema.hasMany(AttachmentSchema, {foreignKey: 'appointementId'});
AttachmentSchema.belongsTo(AppointmentSchema, {foreignKey: 'appointmentId'});

export {
  AppointmentSchema,
  UserSchema,
  MedicalQuestionsSchema
}