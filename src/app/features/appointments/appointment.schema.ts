import { DataTypes, Model, Sequelize, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../../connections/pg.connection.js";
import type { iso } from "zod";

export class AppointmentSchema extends Model<
 InferAttributes<AppointmentSchema>,
 InferCreationAttributes<AppointmentSchema>
>{
  declare id: CreationOptional<string>;
  declare patientId: string;
  declare clinicianId: string;
  declare visitReason: string;
  declare status: 'intakePending' | 'intakeCompleted' | 'checkedIn' | 'inProgress' | 'completed';
  declare clinicalSummary: CreationOptional<string>;
  declare appointmentDate: string;
  declare startTime: string;
  declare endTime: string;
  declare createdAt: CreationOptional<Date | undefined>;
  declare updatedAt: CreationOptional<Date | undefined>;

  toSafeJSON()  {
    const {createdAt, updatedAt, ...rest} = this.toJSON();
    return rest;
  }
}

AppointmentSchema.init({
   id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.fn('uuidv4')
    },
    patientId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    clinicianId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    visitReason: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clinicalSummary: {
      type: DataTypes.STRING,
      allowNull: true
    },
    appointmentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false
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
  tableName: 'appointments',
  timestamps: true
});