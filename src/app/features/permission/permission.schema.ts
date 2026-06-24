import { DataTypes, Model, Sequelize, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import { sequelize } from "../../connections/pg.connection.js";

export class PermissionSchema extends Model<
  InferAttributes<PermissionSchema>,
  InferCreationAttributes<PermissionSchema>
>{
  declare id: CreationOptional<string>;
  declare name: string;
}

PermissionSchema.init(
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
    tableName: 'permissions',
    timestamps: true
  }
);