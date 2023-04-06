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
    const tasks = await db.Task.findAll({
      order: [['id']]
    });
    const tags = await db.Tag.findAll({
      order: [['id']]
    });
    return queryInterface.bulkInsert('TaggedTasks', [
      { taskId: tasks[0].id, tagId: tags[0].id, createdAt: new Date(), updatedAt: new Date() },
      { taskId: tasks[1].id, tagId: tags[0].id, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('TaggedTasks', null, {});
  }
};
