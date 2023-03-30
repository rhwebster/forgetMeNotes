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
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: 'id'
      }
    },
    user2Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: 'id'
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lastActionUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: 'id'
      }
    },
    user1Role: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    user2Role: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, 
  {
    sequelize,
    modelName: 'Relationship',
    indexes: [
      {
        unique: true,
        fields: ['user1Id', 'user2Id']
      }
    ]
  });
  return Relationship;
};