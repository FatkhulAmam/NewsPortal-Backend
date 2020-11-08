'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class news extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  news.init({
    author: DataTypes.STRING,
    headline: DataTypes.STRING,
    category: DataTypes.INTEGER,
    deskripsi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'news',
  });
  return news;
};