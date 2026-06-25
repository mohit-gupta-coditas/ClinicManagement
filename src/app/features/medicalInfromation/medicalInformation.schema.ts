import { DataTypes, Model, Sequelize, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../../connections/pg.connection.js";

export class MedicalQuestionsSchema extends Model<
  InferAttributes<MedicalQuestionsSchema>,
  InferCreationAttributes<MedicalQuestionsSchema>
>{
  declare id: CreationOptional<string>;
  declare patientId: string;
  declare appointmentId: string;
  declare smoker: boolean;
  declare diabetic: boolean;
  declare alcoholConsumption: boolean;
  declare oldDiseaseDescription: CreationOptional<string | undefined>;
  declare createdAt: CreationOptional<Date | undefined>;
  declare updatedAt: CreationOptional<Date | undefined>;

  toSafeJSON() {
    const {createdAt, updatedAt, ...rest} = this.toJSON();
    return rest;
  }
}

MedicalQuestionsSchema.init({
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
  appointmentId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  smoker: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  diabetic: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  alcoholConsumption: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  oldDiseaseDescription: {
    type: DataTypes.STRING,
    allowNull: true
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
  tableName: 'medicalHistoryQuestions',
  timestamps: true
})