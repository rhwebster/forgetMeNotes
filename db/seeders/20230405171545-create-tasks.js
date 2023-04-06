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
   const lists = await db.List.findAll({
    order: [['id']]
   });

   try {
    await queryInterface.bulkInsert('Tasks', [
      { name: 'Garbage', userId: lists[0].userId, listId: lists[0].id, completed: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Dishes', notes: "There are a lot of dishes. Please take care of them", userId: lists[0].userId, listId: lists[0].userId, completed: false, createdAt: new Date(), updatedAt: new Date() }
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
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
