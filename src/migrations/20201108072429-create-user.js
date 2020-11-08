'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'photo',
        {
          type: Sequelize.STRING,
          allowNull: true,
          after: 'password'
        },
      ),
      queryInterface.addColumn(
        'users', // table name
        'gander', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
          after: 'password' // after option is only supported by MySQL
        },
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
