import { DataTypes, Model, Sequelize, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import type { ROLES } from "../../app.types.js";
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
  declare role: ROLES;
  declare isDeleted: CreationOptional<boolean | undefined>;
  declare createdAt: CreationOptional<Date | undefined>;
  declare updatedAt: CreationOptional<Date | undefined>;
  declare createdBy: CreationOptional<string | undefined>;
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
      'paitent',
      'clinician',
      'front-desk co-ordinator'
    ),
    allowNull: false,
  },
  isDeleted : {
    type : DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
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
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: true, 
    references: {
      model: UserSchema,
      key: 'id'
    },
    defaultValue: null
  }
}, {
  sequelize,
  tableName: 'users',
  timestamps: true
});