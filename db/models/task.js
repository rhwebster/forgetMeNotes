'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.List, { foreignKey: 'listId' });
      Task.belongsTo(models.User, { foreignKey: 'userId' });
      Task.belongsToMany(models.Tag, {
        through: "TaggedTask",
        foreignKey: "taskId",
        otherKey: "tagId",
        as: "TasksWithTags"
      })
    }
  }
  Task.init({
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    due: {
      type: DataTypes.DATE,
    },
    completed: {
      type: DataTypes.BOOLEAN,
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};