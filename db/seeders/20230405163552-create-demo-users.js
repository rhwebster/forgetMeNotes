'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
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
   try {
    await queryInterface.bulkInsert('Users', [
      { email: 'clark@dailyplanet.com', firstName: 'Clark', lastName: 'Kent', hashedPassword: await bcrypt.hash('password1', 8), createdAt: new Date(), updatedAt: new Date() },
      { email: 'bruce@wayne.inc', firstName: 'Bruce', lastName: 'Wayne', hashedPassword: await bcrypt.hash('password2', 8), createdAt: new Date(), updatedAt: new Date() },
      { email: 'bugs@looney.com', firstName: 'Bug', lastName: 'Barney', hashedPassword: await bcrypt.hash('password3', 8), createdAt: new Date(), updatedAt: new Date() },
      { email: 'daffy@looney.com', firstName: 'Daffy', lastName: 'Duck', hashedPassword: await bcrypt.hash('password4', 8), createdAt: new Date(), updatedAt: new Date() },
      { email: 'elmer@looney.com', firstName: 'Elmer', lastName: 'Fudd', hashedPassword: await bcrypt.hash('password5', 8), createdAt: new Date(), updatedAt: new Date() }
    ], {});
   } catch (err) {
    console.log(err);
    throw err;
   }
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
