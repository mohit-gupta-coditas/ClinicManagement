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
      'appointments',
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.fn('uuidv4')
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
        Date: {
          type: DataTypes.DATE,
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
      'appointments',
       {
        type: 'foreign key',
        fields: ['patientId'],
        name: 'fk_patient_and_appointment',
        references: {
          table: 'users',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );

    await queryInterface.addConstraint(
      'appointments',
      {
        type: 'foreign key',
        fields: ['clinicianId'],
        name: 'fk_clinician_and_appointment',
        references: {
          table: 'users',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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

    await queryInterface.dropTable('appointments');
  }
};
