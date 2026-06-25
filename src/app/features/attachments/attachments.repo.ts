import type { WhereOptions } from "sequelize";
import { AttachmentSchema } from "./attachments.schema.js";
import type { Attachment } from "./attachments.types.js";

const getAttachment = async (attachment: Partial<Attachment>) => AttachmentSchema.findOne({where: attachment});

const getAllAttachments = async (where: WhereOptions<Attachment>, limit: number, offset: number, order: any) => AttachmentSchema.findAll({where, limit, offset, order});

const createAttachment = async (attachment: Pick<Attachment, 'patientId' | 'appointmentId' | 'type'| 'path'>) => AttachmentSchema.create(attachment);

const createBulkAttachment = async (attachments: Array<Pick<Attachment, 'patientId' | 'appointmentId' | 'type'| 'path'>>) => AttachmentSchema.bulkCreate(attachments);

const deleteAttachment = async (id: string) => AttachmentSchema.destroy({where: {id}});

export default {
  getAttachment,
  createAttachment,
  createBulkAttachment,
  deleteAttachment,
  getAllAttachments
}