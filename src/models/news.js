const {
  Model,
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
      news.belongsTo(models.user, { foreignKey: 'author_id', as: 'author' });
      news.belongsTo(models.category, { foreignKey: 'category', as: 'categories' });
    }
  }
  news.init({
    author_id: DataTypes.INTEGER,
    headline: DataTypes.STRING,
    category: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    picture: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'news',
  });
  return news;
};
