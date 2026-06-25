import type { WhereOptions } from "sequelize";
import { AppointmentSchema } from "./appointment.schema.js";
import type { Appointment } from "./appointment.types.js";

const createAppointment = (appointment: Pick<Appointment,"patientId" | "clinicianId" | "visitReason" |"appointmentDate" | "startTime" | "endTime" | "status">) => AppointmentSchema.create(appointment);

const getOneAppointment = (appointment: Partial<Appointment>) => AppointmentSchema.findOne({where: appointment});

const getAllAppointments = (where: WhereOptions<Pick<Appointment, "patientId" | "clinicianId" | "status">>, limit: number, offset: number, order: any) => AppointmentSchema.findAll({where, limit, offset, order});

const updateAppointment = (appointment: Partial<Appointment>, id: string) => AppointmentSchema.update(appointment, {where: {id}});

const deleteAppointment = (id: string) => AppointmentSchema.destroy({where: {id}});

export default {
  createAppointment,
  getOneAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment
}