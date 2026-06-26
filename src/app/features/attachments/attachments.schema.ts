import { DataTypes, Model, Sequelize, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import type { ATTACHMENT_TYPE } from "../../app.types.js";
import { sequelize } from "../../connections/pg.connection.js";
import { AppointmentSchema } from "../appointments/appointment.schema.js";
import { IdempotencyParameterMismatch$ } from "@aws-sdk/client-s3";
import { UserSchema } from "../user/user.schema.js";

export class AttachmentSchema extends Model<
  InferAttributes<AttachmentSchema>,
  InferCreationAttributes<AttachmentSchema>
>{
  declare id: CreationOptional<string>;
  declare type: ATTACHMENT_TYPE;
  declare appointmentId: string;
  declare patientId: string;
  declare path: string;
  declare createdAt: CreationOptional<Date | undefined>;
  declare updatedAt: CreationOptional<Date | undefined>;
}

AttachmentSchema.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.fn('uuidv4')
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  appointmentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: AppointmentSchema,
      key: 'id'
    }
  },
  patientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: UserSchema,
      key: 'id'
    }
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now')
  }
}, {
  sequelize,
  tableName: 'attachments',
  timestamps: true
});