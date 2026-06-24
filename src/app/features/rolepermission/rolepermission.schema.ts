

import { DataTypes, Model, Sequelize, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../../connections/pg.connection.js";
import { UserSchema } from "../user/user.schema.js";

export class RoleSchema extends Model<
  InferAttributes<RoleSchema>,
  InferCreationAttributes<RoleSchema>
>{
  declare id: CreationOptional<string>;
  declare roleId: string;
  declare permissionId: string;
}

RoleSchema.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.fn('uuidv4')
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UserSchema,
        key: 'id'
      },
    },
    permissionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UserSchema,
        key: 'id'
      },
    }
  },
  {
    sequelize,
    tableName: 'rolePermissions',
    timestamps: true
  }
);