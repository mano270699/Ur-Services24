const Sequalize = require('sequelize');
const sequelize = require('../config/database');




const Client = sequelize.define('client', {

    C_id: {
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    email: {
        type: Sequalize.STRING,
        allowNull: false
    },
    password: {

        type: Sequalize.STRING,
        allowNull: true

    },
    phone: {
        type: Sequalize.STRING,
        allowNull: false

    },
    Profession: {
        type: Sequalize.STRING,
        allowNull: false

    },
    address: {
        type: Sequalize.STRING,
        allowNull: false

    },
    status: {
        type: Sequalize.STRING,
        allowNull: false



    },
    Skill: {
        type: Sequalize.STRING,
        allowNull: false

    },
    conditions: {
        type: Sequalize.STRING,
        allowNull: false

    }




}, { timestamps: false, tableName: 'client' });
module.exports = Client;