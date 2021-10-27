const Sequalize = require('sequelize');
const sequelize = require('../config/database');




const ClientData = sequelize.define('client_data', {


    id: {
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true


    },
    C_id: {
        type: Sequalize.INTEGER,
        allowNull: false,


    },
    FirstName: {
        type: Sequalize.STRING,
        allowNull: false

    },

    LastName: {
        type: Sequalize.STRING,
        allowNull: false

    },

    gender: {
        type: Sequalize.STRING,
        allowNull: false

    },
    Country: {
        type: Sequalize.STRING,
        allowNull: false
    },
    ville: {

        type: Sequalize.STRING,
        allowNull: false

    },
    Province: {
        type: Sequalize.STRING,
        allowNull: false

    },
    BDate: {
        type: Sequalize.DATE,
        allowNull: false

    },
    Rue: {
        type: Sequalize.STRING,
        allowNull: false

    },
    num_rue: {
        type: Sequalize.INTEGER,
        allowNull: false

    },
    Company_Name: {
        type: Sequalize.STRING,
        allowNull: false

    },
    Legal_Form: {
        type: Sequalize.STRING,
        allowNull: false

    },
    Social_Security_num: {
        type: Sequalize.INTEGER,
        allowNull: false

    },
    num_TVA: {
        type: Sequalize.INTEGER,
        allowNull: false

    },
    address_mail: {
        type: Sequalize.STRING,
        allowNull: false

    },
    Identify_doc: {
        type: Sequalize.STRING,
        allowNull: false

    },
    num_Identify_doc: {
        type: Sequalize.INTEGER,
        allowNull: false

    },
    Identify_Doc_date_ex: {
        type: Sequalize.DATE,
        allowNull: false

    },
    Front_Doc: {
        type: Sequalize.STRING,
        allowNull: false

    },
    Retro_Doc: {
        type: Sequalize.STRING,
        allowNull: false

    },
    Kbis_Doc: {
        type: Sequalize.STRING,
        allowNull: false

    },
    Kbis_num: {
        type: Sequalize.INTEGER,
        allowNull: false

    },
    Assurance_Doc: {
        type: Sequalize.STRING,
        allowNull: false

    },
    Assurance_num: {
        type: Sequalize.INTEGER,
        allowNull: false

    },
    Assurance_Date_ex: {
        type: Sequalize.DATE,
        allowNull: false

    },
    Licence_Doc: {
        type: Sequalize.STRING,
        allowNull: false

    },
    Licence_num: {
        type: Sequalize.INTEGER,
        allowNull: false

    },
    image: {
        type: Sequalize.STRING,
        allowNull: true

    },
    status: {
        type: Sequalize.STRING,
        allowNull: true

    },
    gocardlessMandateID: {
        type: Sequalize.STRING,
        allowNull: true

    },
    gocardlessCustomerID: {
        type: Sequalize.STRING,
        allowNull: true

    }




}, { timestamps: false, tableName: 'client_data' });
module.exports = ClientData;