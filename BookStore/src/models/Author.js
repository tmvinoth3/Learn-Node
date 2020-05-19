const Sequelize = require('sequelize');

module.exports = sequelize.define("Author",{
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
});
