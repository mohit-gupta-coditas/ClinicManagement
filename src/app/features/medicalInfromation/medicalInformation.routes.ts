import { MANAGE_ROLE } from "../../app.types.js";
import { customRouter } from "../../routes/custom.router.js";
import { ResponseHandler } from "../../utils/response.handler.js";
import { body, params } from "../../utils/validate.request.js";
import medicalInformationService from "./medicalInformation.service.js";
import { ZMedicalQuestions } from "./medicalInformationtypes.js";

const router = customRouter();

router.get(
  '/',
  { 
    isPermitted: MANAGE_ROLE.pick(
      'clinician',
      'front-desk co-ordinator',
    )
  },
  body(ZMedicalQuestions.pick({appointmentId:true})),
  async (req, res, next) => {
    try {
      const result = await medicalInformationService.getMedicalInfo({appointmentId: req.body.appointmentId});
      res.send(new ResponseHandler(result.toSafeJSON()));
    } catch(err) {
      next(err);
    }
  }
);

router.post(
  '/',
  {
    isPermitted: MANAGE_ROLE.pick('patient')
  },
  body(ZMedicalQuestions.pick({
    patientId: true,
    appointmentId:true,
    smoker: true,
    diabetic: true,
    alcoholConsumption: true,
    oldDiseaseDescription: true
  })),
  async (req, res, next) => {
    try {
      const result = await medicalInformationService.createMedicalInfo(req.body);
      res.send(new ResponseHandler(result));
    } catch(err) {
      next(err);
    }
  }
);

router.patch(
  '/:id',
  {
    isPermitted: MANAGE_ROLE.pick(
      'clinician'
    )
  },
  params(ZMedicalQuestions.pick({id: true})),
  body(ZMedicalQuestions.pick({
    patientId: true,
    appointmentId:true,
    smoker: true,
    diabetic: true,
    alcoholConsumption: true,
    oldDiseaseDescription: true
  })),
  async (req, res, next) => {
    try {
      const result = await medicalInformationService.updateMedicalInfo(req.body, req.params.id as string);
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
      'clinician'
    )
  },
  params(ZMedicalQuestions.pick({id: true})),
  async (req, res, next) => {
    try {
      const result = await medicalInformationService.deleteMedicalInfo(req.params.id as string);
      res.send(new ResponseHandler(result));
    } catch(err) {
      next(err);
    }
  }
)