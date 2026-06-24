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
      'attachments',
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.fn('uuidv4')
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false
        },
        appointmentId: {
          type: DataTypes.UUID,
          allowNull: false
        },
        patientId: {
          type: DataTypes.UUID,
          allowNull: false
        },
        path: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.fn('now')
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.fn('now')
        }
      }
    );

    await queryInterface.addConstraint(
      'attachments',
       {
        type: 'foreign key',
        fields: ['patientId'],
        name: 'fk_patient_and_attachments',
        references: {
          table: 'users',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );

    await queryInterface.addConstraint(
      'attachments',
       {
        type: 'foreign key',
        fields: ['appointmentId'],
        name: 'fk_appointment_and_attachments',
        references: {
          table: 'appointments',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('attachments');
  }
};
