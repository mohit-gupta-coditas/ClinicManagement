import { Op, type WhereOptions } from "sequelize";
import type { ATTACHMENT_TYPE, Payload } from "../../app.types.js";
import { ATTACHMENT_RESPONSE } from "./attachment.response.js";
import attachmentsRepo from "./attachments.repo.js";
import type { Attachment, AttachmentOptions } from "./attachments.types.js";
import { getPresignedURL } from "../../utils/aws.helper.js";

const getAttachment = async (attachment: Partial<Attachment>) => {
  try {
    const oldAttachment = await attachmentsRepo.getAttachment(attachment);
    if(!oldAttachment) throw ATTACHMENT_RESPONSE.ATTACHMENT_NOT_FOUND;

    oldAttachment.path = await getPresignedURL(oldAttachment.path);
    return oldAttachment;
  } catch(err) {
    throw err;
  }
}

const getAllAttachments = async (options: AttachmentOptions, patientId: string) => {
  try {
    const where: WhereOptions<Attachment> = {};
    const limit = options.limit ?? 10;
    const offset = options.offset ?? 0;
    const order: Array<Array<string>> = [[]];

    if(options.type) {
      where.type = {
        [Op.eq] : options.type
      }
    }

    if(options.appointmentId) {
      where.appointmentId = {
        [Op.eq] : options.appointmentId
      }
    }

    where.patientId = {
      [Op.eq] : patientId
    }

    order[0]?.push(options.sortBy, options.orderBy);
    
    const allAttachments = await attachmentsRepo.getAllAttachments(where, limit, offset, order);
    return allAttachments;
  } catch(err) {
    throw err;
  }
}

const createAttachment = async (path: string, type: ATTACHMENT_TYPE, payload: Payload) => {
  try {
    await attachmentsRepo.createAttachment({
      path, 
      type, 
      patientId: payload.userId,
      appointmentId: payload.appointmentId as string
    });
    
    return ATTACHMENT_RESPONSE.ATTACHMENT_SAVED;
  } catch(err) {
    console.log(err);
    throw ATTACHMENT_RESPONSE.ATTACHMENT_NOT_SAVED;
  }
}

const createManyAttachments = async (paths: string[], type: ATTACHMENT_TYPE, payload: Payload) => {
  try {
    const attachments = [];

    for(const path of paths) {
      attachments.push({
        path, 
        type, 
        patientId: payload.userId,
        appointmentId: payload.appointmentId as string
      });
    }

    await attachmentsRepo.createBulkAttachment(attachments);
    return ATTACHMENT_RESPONSE.ATTACHMENT_SAVED; 
  } catch(err) {
    throw ATTACHMENT_RESPONSE.ATTACHMENT_NOT_SAVED;
  }
}

const deleteAttachment = async (id: string) => {
  try {
    const isDeleted = await attachmentsRepo.deleteAttachment(id);
    if(!isDeleted) throw ATTACHMENT_RESPONSE.ATTACHMENT_NOT_DELETED;
    
    return ATTACHMENT_RESPONSE.ATTACHMENT_DELETED;
  } catch(err) {
    throw err;
  }
}

export default{
  createAttachment,
  createManyAttachments,
  deleteAttachment,
  getAttachment,
  getAllAttachments
}