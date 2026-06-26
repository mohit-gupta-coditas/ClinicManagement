import { Op, type WhereOptions } from "sequelize";
import appointmentRepo from "./appointment.repo.js";
import { APPOINTMENT_RESPONSE } from "./appointment.response.js";
import type { Appointment, AppointmentOptions } from "./appointment.types.js";
import { sendEmail } from "../../utils/aws.helper.js";
import userService from "../user/user.service.js";
import { env } from "../../../validate.env.js";
import { signToken } from "../../utils/jwt.helper.js";
import { DateTime } from "luxon";
import { talkToAI } from "../../utils/ai.tools.js";

const getAppointment = async (appointment: Partial<Appointment>) => {
  try {
    const oldAppointment = await appointmentRepo.getOneAppointment(appointment);
    if(!oldAppointment) throw APPOINTMENT_RESPONSE.APPOINTMENT_NOT_FOUND;
    return oldAppointment;
  } catch(err) {
    throw err;
  }
}

const createAppointment = async (appointment: Pick<Appointment, "visitReason" | "patientId" | "clinicianId" | "appointmentDate" | "startTime" | "endTime">) => {
  try {

    const currentDate = DateTime.now().toFormat('yyyy-MM-dd');
    const currentTime = DateTime.now().toFormat('HH:mm');

    if(appointment.appointmentDate < currentDate) {
      throw APPOINTMENT_RESPONSE.CANNOT_BOOK_PAST_DATE;
    }

    if(appointment.startTime < currentTime) {
      throw APPOINTMENT_RESPONSE.CANNOT_BOOK_PAST_TIME;
    }

    const oldAppointment = await appointmentRepo.getOneAppointment({startTime: appointment.startTime, endTime: appointment.endTime, appointmentDate: appointment.appointmentDate.slice(0, 10)});

    if(oldAppointment) throw APPOINTMENT_RESPONSE.APPOINTMENT_ALREADY_EXISTS;

    const currAppointment = await appointmentRepo.createAppointment({...appointment, status: "intakePending"});

    const user = await userService.getUser({id: appointment.patientId});

    // const appointmentDateSplit = appointment.appointmentDate.split('-');
    // const appointmentTimeSplit = appointment.appointmentDate.split(':');

    // const currTimeObject = DateTime.now();
    // const appointmentTimeObject = DateTime.fromObject({
    //   year: Number(appointmentDateSplit[0]),
    //   month: Number(appointmentDateSplit[1]),
    //   day: Number(appointmentDateSplit[2]),
    //   hour: Number(appointmentTimeSplit[0]),
    //   minute: Number(appointmentTimeSplit[1])
    // });

    const intakeToken = signToken(
      {
        userId: user.id,
        role: user.role,
        appointmentId: currAppointment.id
      },
      env.JWT_SECRET_KEY,
      100000
    );

    await sendEmail(
      user.email,
      "Appointment Booked | Intake Form Filling",
      `<h1> Please click on link to fill Intake Form : ${env.FRONT_END_URL}/${intakeToken} </h1>`
    );

    return APPOINTMENT_RESPONSE.APPOINTMENT_CREATED;
  } catch(err: any) {
    console.log(err);
    if(err.statusCode) {
      throw err;
    }
    throw APPOINTMENT_RESPONSE.APPOINTMENT_NOT_CREATED;
  }
}

const schedulePendingIntakeEmail = async () => {
  try {
    const currTime = DateTime.now().toFormat('HH:mm');

    if(currTime < env.CLINIC_OPEN_TIME || currTime > env.CLINIC_CLOSE_TIME) {
      return;
    }

    const appointments = await appointmentRepo.getAllAppointments(
      {
        appointmentDate: DateTime.now().toFormat('yyyy-MM-dd'),
        startTime: {
          [Op.lte]:DateTime.now().plus({minutes: 15}).toFormat('HH:mm')
        },
        status: 'intakePending',
      },
      100, 
      0, 
      [['startTime']]
    );

    appointments.map(async (currAppointment) => {
      const user = await userService.getUser({id: currAppointment.patientId});
      await sendEmail(
        user.email,
        'Intake Form Filling Pending',
        `Please fill out the intake form that was send on your previous email`
      );
    });

  } catch(err) {
    throw err;
  }
}

const getAllAppointments = async (options: AppointmentOptions, userId: string) => {
  try {
    const where: WhereOptions<Appointment> = {};
    const limit = options.limit ?? 10;
    const offset = options.offset ?? 0;
    const order: Array<Array<string>> = [[]];

    const user = await userService.getUser({id: userId});


    if(options.patientId) {
      where.patientId = {
        [Op.eq] : options.patientId
      }
    }

    if(user.role === 'clinician') {
      where.clinicianId = {
        [Op.eq] : options.clinicianId
      }
    } else {
      if(options.clinicianId) {
        where.clinicianId = {
          [Op.eq] : options.clinicianId
        }
      }
    }

    if(options.status) {
      where.status = {
        [Op.eq] : options.status
      }
    }

    if(options.startTime) {
      where.startTime = {
        [Op.eq] : options.startTime
      }
    }

    if(options.endTime) {
      where.endTime = {
        [Op.eq] : options.endTime
      }
    }

    where.appointmentDate = {
      [Op.eq] : options.appointmentDate
    }

    order[0]?.push(options.sortBy, options.orderBy);

    const allAppointments = await appointmentRepo.getAllAppointments(where, limit, offset, order);
    return allAppointments;
  } catch(err) {
    throw err;
  }
}

const updateAppointment = async (appointment: Partial<Appointment>, id: string) => {
  try {
    const oldAppointment = await appointmentRepo.getOneAppointment({id});
    if(!oldAppointment) throw APPOINTMENT_RESPONSE.APPOINTMENT_NOT_FOUND;

    const isUpdated = await appointmentRepo.updateAppointment(appointment, id);
    if(!isUpdated) throw APPOINTMENT_RESPONSE.APPOINTMENT_NOT_UPDATED;

    return APPOINTMENT_RESPONSE.APPOINTMENT_UPDATED;
  } catch(err) {
    throw err;
  }
}

const deleteAppointment = async (id: string) => {
  try {
    const oldAppointment = await appointmentRepo.getOneAppointment({id});
    if(!oldAppointment) throw APPOINTMENT_RESPONSE.APPOINTMENT_NOT_FOUND;

    const isDeleted = await appointmentRepo.deleteAppointment(id);
    if(!isDeleted) throw APPOINTMENT_RESPONSE.APPOINTMENT_NOT_DELETED;

    return APPOINTMENT_RESPONSE.APPOINTMENT_DELETED;
  } catch(err) {
    throw err;
  }
}

const assistantRequest = async (input: string, userId: string) => {
  try {
    const result = await talkToAI(input, userId);
    return result;
  } catch(err) {
    throw err;
  }
}

export default {
  getAllAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  schedulePendingIntakeEmail,
  assistantRequest
}