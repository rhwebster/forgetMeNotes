'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Relationship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Relationship.init({
    user1Id: DataTypes.INTEGER,
    user2Id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    lastActionUserId: DataTypes.INTEGER,
    user1Role: DataTypes.ARRAY,
    user2Role: DataTypes.ARRAY,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Relationship',
  });
  return Relationship;
};