import type { WhereOptions } from "sequelize";
import type { MedicalQuestions } from "./medicalInformationtypes.js";
import { MedicalQuestionsSchema } from "../../connections/associations.js";

const createMedicalInformation = (medicalquestions: Pick<MedicalQuestions, "patientId" | "appointmentId" | "smoker" | "diabetic" | "alcoholConsumption">) => MedicalQuestionsSchema.create(medicalquestions);

const getMedicalInformation = (medicalquestions : Partial<MedicalQuestions>) => MedicalQuestionsSchema.findOne({where: medicalquestions});

const getAllMedicalInformation = (where: WhereOptions<MedicalQuestions>, limit: number, offset: number, order: any) => MedicalQuestionsSchema.findAll({where, limit, offset, order});

const updateMedicalInformation = (medicalquestions: Partial<Pick<MedicalQuestions, "smoker" | "diabetic" | "alcoholConsumption" | "oldDiseaseDescription">>, id: string) => MedicalQuestionsSchema.update(medicalquestions, {where: {id}});

const deleteMedicalInformation = (id: string) => MedicalQuestionsSchema.destroy({where: {id}});

export default {
  createMedicalInformation,
  getMedicalInformation,
  getAllMedicalInformation,
  updateMedicalInformation,
  deleteMedicalInformation
}