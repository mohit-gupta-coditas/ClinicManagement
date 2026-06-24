'use strict';

import { DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(
      'rolepermissions',
      {
       id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.fn('uuidv4')
        },
        roleId: {
          type: DataTypes.UUID,
          allowNull: false
        },
        permissionId: {
          type: DataTypes.UUID,
          allowNull: false
        }
      }
    );

    await queryInterface.addConstraint(
      'rolepermissions',
      {
        type: 'foreign key',
        fields: ['roleId'],
        name: 'fk_role_connect',
        references: {
          table: 'roles',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      }
    );

    await queryInterface.addConstraint(
      'rolepermissions',
      {
        type: 'foreign key',
        fields: ['permissionId'],
        name: 'fk_permission_connect',
        references: {
          table: 'permissions',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('rolepermissions')
  }
};
