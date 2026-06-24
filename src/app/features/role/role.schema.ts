import { DataTypes, Model, Sequelize, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../../connections/pg.connection.js";

export class RoleSchema extends Model<
  InferAttributes<RoleSchema>,
  InferCreationAttributes<RoleSchema>
>{
  declare id: CreationOptional<string>;
  declare name: string;
}

RoleSchema.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.fn('uuidv4')
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'roles',
    timestamps: true
  }
);