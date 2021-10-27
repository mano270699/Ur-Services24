const Sequalize = require('sequelize');
const sequelize = require('../config/database');




const Service = sequelize.define('task', {

    task_id: {
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    task_title: {
        type: Sequalize.STRING,
        allowNull: false
    },
    Cost: {

        type: Sequalize.DECIMAL,
        allowNull: true

    },
    Type: {
        type: Sequalize.STRING,
        allowNull: false

    },
    Cust_name: {
        type: Sequalize.STRING,
        allowNull: false

    },
    Cust_phone: {
        type: Sequalize.STRING,
        allowNull: false

    },
    Cust_address: {
        type: Sequalize.STRING,
        allowNull: false

    },
    description: {
        type: Sequalize.STRING,
        allowNull: false

    },
    status: {
        type: Sequalize.STRING,
        allowNull: false



    },
    invoice: {
        type: Sequalize.STRING,
        allowNull: true

    },
    DateTime: {
        type: Sequalize.DATE,
        allowNull: false

    },
    A_Id: {
        type: Sequalize.INTEGER,
        allowNull: false

    },
    C_Id: {
        type: Sequalize.INTEGER,
        allowNull: false

    },
    paymentID: {
        type: Sequalize.STRING,
        allowNull: true

    }




}, { timestamps: false, tableName: 'task' });
module.exports = Service;