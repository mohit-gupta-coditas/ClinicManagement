import { MANAGE_ROLE } from "../../app.types.js";
import { customRouter } from "../../routes/custom.router.js";
import { ResponseHandler } from "../../utils/response.handler.js";
import { body, params, query } from "../../utils/validate.request.js";
import appointmentService from "./appointment.service.js";
import { ZAppointment, ZAppointmentOptions, ZAssistant } from "./appointment.types.js";

const router = customRouter();

router.get(
  '/:id',
  { 
    isPermitted: MANAGE_ROLE.omit(
      'super-admin'
    )
  },
  params(ZAppointment.pick({id:true})),
  async (req, res, next) => {
    try {
      const result = await appointmentService.getAppointment({id: req.params.id as string});
      res.send(new ResponseHandler(result.toSafeJSON()));
    } catch(err) {
      next(err);
    }
  }
);

router.post(
  '/',
  { 
    isPermitted: MANAGE_ROLE.pick(
      'patient'
    )
  },
  body(ZAppointment.pick({
    visitReason: true,
    patientId: true, 
    clinicianId: true,  
    appointmentDate: true, 
    startTime: true, 
    endTime: true
  })),
  async (req, res, next) => {
    try {
      const result = await appointmentService.createAppointment(req.body);
      res.send(new ResponseHandler(result));
    } catch(err) {
      next(err);
    }
  }
);

router.get(
  '/',
  { 
    isPermitted: MANAGE_ROLE.pick(
      'clinician',
      'front-desk co-ordinator',
      'super-admin'
    )
  },
  query(ZAppointmentOptions),
  async (req, res, next) => {
    try {
      const result = await appointmentService.getAllAppointments(req.options, req.payload.userId);
      res.send(new ResponseHandler(result.map(appointment => appointment.toSafeJSON())));
    } catch(err) {
      next(err);
    }
  }
)


router.patch(
  '/:id',
  { 
    isPermitted: MANAGE_ROLE.pick(
      'front-desk co-ordinator',
      'clinician'
    )
  },
  params(ZAppointment.pick({id: true})),
  body(ZAppointment.pick({
    visitReason: true,
    patientId: true, 
    clinicianId: true,  
    appointmentDate: true, 
    startTime: true, 
    endTime: true,
    status: true
  })),
  async (req, res, next) => {
    try {
      const result = await appointmentService.updateAppointment(req.body, req.params.id as string);
      res.send(new ResponseHandler(result));
    } catch(err) {
      next(err);
    }
  }
);

router.delete(
  '/:id',
  { 
    isPermitted: MANAGE_ROLE.pick(
      'patient',
      'front-desk co-ordinator'
    )
  },
  params(ZAppointment.pick({id: true})),
  async (req, res, next) => {
    try {
      const result = await appointmentService.deleteAppointment(req.params.id as string);
      res.send(new ResponseHandler(result));
    } catch(err) {
      next(err);
    }
  }
);

router.post(
  '/assistant',
  { 
    isPermitted: MANAGE_ROLE.pick(
      'patient'
    )
  },
  body(ZAssistant),
  async (req, res, next) => {
    try {
      const result = await appointmentService.assistantRequest(req.body.input, req.payload.userId);
      res.send(new ResponseHandler(result));
    } catch(err) {
      next(err);
    }
  }
)

export default router.setRouter('/appointment');