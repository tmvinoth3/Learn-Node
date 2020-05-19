const Sequelize = require('sequelize');

const sequelize = new Sequelize("bookstore",'root','root',{
    host:"127.0.0.1",
    dialect: "mysql",
    operator:false,
    define: {
        timestamps: false
    }
});

module.exports = sequelize;
global.sequelize = sequelize;