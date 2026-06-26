import medicalInfoRepo from "./medicalInformation.repo.js";
import { MEDICAL_INFORMATION_RESPONSE } from "./medicalInformation.response.js";
import type { MedicalQuestions } from "./medicalInformationtypes.js";

const getMedicalInfo = async (medicalInfo: Partial<MedicalQuestions>) => {
  try {
    const oldMedicalInfo = await medicalInfoRepo.getMedicalInformation(medicalInfo);
    if(!oldMedicalInfo) throw MEDICAL_INFORMATION_RESPONSE.MEDICAL_INFORMATION_NOT_FOUND;
    return oldMedicalInfo;
  } catch(err) {
    throw err;
  }
}

const createMedicalInfo = async (medicalInfo: Pick<MedicalQuestions, "patientId" | "appointmentId" | "smoker" | "diabetic" | "alcoholConsumption">) => {
  try {
    const oldMedicalInfo = await medicalInfoRepo.getMedicalInformation({appointmentId: medicalInfo.appointmentId});
    if(oldMedicalInfo) throw MEDICAL_INFORMATION_RESPONSE.MEDICAL_INFORMATION_ALREADY_EXISTS;

    await medicalInfoRepo.createMedicalInformation(medicalInfo);

    return MEDICAL_INFORMATION_RESPONSE.MEDICAL_INFORMATION_SAVED;
  } catch(err: any) {
    console.log(err);
    throw MEDICAL_INFORMATION_RESPONSE.MEDICAL_INFORMATION_NOT_SAVED;
  }
}

const updateMedicalInfo = async (medicalInfo: Partial<MedicalQuestions>, id: string) => {
  try {
    const oldMedicalInfo = await medicalInfoRepo.getMedicalInformation({id});
    if(!oldMedicalInfo) throw MEDICAL_INFORMATION_RESPONSE.MEDICAL_INFORMATION_NOT_FOUND;

    const isUpdated = await medicalInfoRepo.updateMedicalInformation(medicalInfo, id);
    if(!isUpdated) throw MEDICAL_INFORMATION_RESPONSE.MEDICAL_INFORMATION_NOT_UPDATED;

    return MEDICAL_INFORMATION_RESPONSE.MEDICAL_INFORMATION_UPDATED;
  } catch(err) {
    throw err;
  }
}

const deleteMedicalInfo = async (id: string) => {
  try {
    const oldMedicalInfo = await medicalInfoRepo.getMedicalInformation({id});
    if(!oldMedicalInfo) throw MEDICAL_INFORMATION_RESPONSE.MEDICAL_INFORMATION_NOT_FOUND;

    const isDeleted = await medicalInfoRepo.deleteMedicalInformation(id);
    if(!isDeleted) throw MEDICAL_INFORMATION_RESPONSE.MEDICAL_INFORMATION_NOT_DELETED;

    return MEDICAL_INFORMATION_RESPONSE.MEDICAL_INFORMATION_DELETED;
  } catch(err) {
    throw err;
  }
}

export default {
  getMedicalInfo,
  createMedicalInfo,
  updateMedicalInfo,
  deleteMedicalInfo
}