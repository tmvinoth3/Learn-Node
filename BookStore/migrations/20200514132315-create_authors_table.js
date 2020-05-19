'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("authors",{
          id:{
              type: Sequelize.INTEGER(11),
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
          },
          name:{
              type:Sequelize.STRING(30),
              allowNull: false,
              unique: true
          },
      }
      );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('authors');
  }
};
