const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    port: 3306,
    database:process.env.DB_NAME,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    host:'localhost',
    dialect:'mariadb'
});

module.exports = sequelize