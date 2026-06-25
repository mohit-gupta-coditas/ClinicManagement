'use strict';

import {genSalt, hash} from "bcryptjs";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   queryInterface.bulkInsert(
    'users',
    [
      {
        name: 'Admin',
        email: 'admin@gmail.com',
        address: 'pune',
        phoneNumber: '8373761726',
        role: 'super-admin',
        password: 'admin@123'
      }
    ],
    {}
   );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      'users',
      {
        role: 'super-admin'
      },
      {}
    );
  }
};
