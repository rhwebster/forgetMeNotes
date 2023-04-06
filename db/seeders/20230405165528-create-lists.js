'use strict';
const db = require('../models');


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
    const userIds = [];
    const emails = ['clark@dailyplanet.com', 'bruce@wayne.inc', 'bugs@looney.com', 'daffy@looney.com', 'elmer@looney.com']
    for (let i = 0; i < emails.length; i++) {
      let user = await db.User.findOne({ where: { email: emails[i] } });
      userIds.push(user.id);
    }
   try {
    await queryInterface.bulkInsert('Lists', [
      { name: 'Inbox', userId: userIds[0], createdAt: new Date(), updatedAt: new Date() },
      { name: 'Inbox', userId: userIds[1], createdAt: new Date(), updatedAt: new Date() },
      { name: 'Inbox', userId: userIds[2], createdAt: new Date(), updatedAt: new Date() },
      { name: 'Inbox', userId: userIds[3], createdAt: new Date(), updatedAt: new Date() }
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
    await queryInterface.bulkDelete('Lists', null, {});
  }
};
