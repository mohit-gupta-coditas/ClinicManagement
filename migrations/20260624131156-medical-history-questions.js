'use strict';

import { DataTypes } from "sequelize";

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
      'medicalHistoryQuestions',
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
        bloodPressure: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        drinking: {
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
      'medicalHistoryQuestions',
       {
        type: 'foreign key',
        fields: ['patientId'],
        name: 'fk_patient_and_questions',
        references: {
          table: 'users',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );

    await queryInterface.addConstraint(
      'medicalHistoryQuestions',
       {
        type: 'foreign key',
        fields: ['appointmentId'],
        name: 'fk_appointment_and_questions',
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
    await queryInterface.dropTable('medicalHistoryQuestions');
  }
};
