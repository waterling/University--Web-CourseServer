'use strict';

const DataTypes = require("sequelize");
const Organizations = require('./OrganizationDefenition');
const connection = require('../connections/DataBaseConnect');

const OrganizationHistory = connection.define('OrganizationHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orgId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    history: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imgURL: {
        type: DataTypes.TEXT
    }

});

Organizations.hasMany(OrganizationHistory, {foreignKey: 'orgId', sourceKey: 'id'});

OrganizationHistory.sync();
module.exports = OrganizationHistory;