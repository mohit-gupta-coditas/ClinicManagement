import { DataTypes, Model, Sequelize, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { MANAGE_ROLE, type ROLES } from "../../app.types.js";
import { sequelize } from "../../connections/pg.connection.js";

export class UserSchema extends Model<
  InferAttributes<UserSchema>, 
  InferCreationAttributes<UserSchema>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare address: string;
  declare phoneNumber: string;
  declare password: string;
  declare passwordVersion: CreationOptional<number | undefined>;
  declare role: 'patient' | 'clinician' | 'front-desk co-ordinator' | 'super-admin';
  declare createdAt: CreationOptional<Date | undefined>;
  declare updatedAt: CreationOptional<Date | undefined>;
}

UserSchema.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.fn('uuidv4')
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },  
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  passwordVersion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  role: {
    type: DataTypes.ENUM(
      'patient','clinician','front-desk co-ordinator', 'super-admin'
    ),
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
  tableName: 'users',
  timestamps: true
});