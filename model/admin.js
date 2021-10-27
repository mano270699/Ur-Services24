const Sequalize = require('sequelize');
const sequelize = require('../config/database');




const Admin = sequelize.define('admin', {

    A_Id: {
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    First_Name: {
        type: Sequalize.STRING,
        allowNull: false

    },

    Last_Name: {
        type: Sequalize.STRING,
        allowNull: false

    },
    email: {
        type: Sequalize.STRING,
        allowNull: false
    },
    password: {

        type: Sequalize.STRING,
        allowNull: false

    },
    image: {
        type: Sequalize.STRING,
        allowNull: false

    },
    phone: {
        type: Sequalize.STRING,
        allowNull: false

    },
    address: {
        type: Sequalize.STRING,
        allowNull: false

    }




}, { timestamps: false, tableName: 'admin' });
module.exports = Admin;