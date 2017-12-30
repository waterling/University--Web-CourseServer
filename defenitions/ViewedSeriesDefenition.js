'use strict';

const DataTypes = require("sequelize");

const connection = require('../connections/DataBaseConnect');
const Users = require('./UserDefinition');
const OnlineSeries = require('./OnlineSeriesDefenition');

const ViewedSeries = connection.define('ViewedSeries', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    time: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    fluid: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    duration: {
        type: DataTypes.DOUBLE,
    },
    haveSeen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

});

Users.hasMany(ViewedSeries, {foreignKey: 'userId', sourceKey: 'id'});
ViewedSeries.belongsTo(OnlineSeries, {as: 'series'});
OnlineSeries.hasMany(ViewedSeries, {foreignKey: 'seriesId', sourceKey: 'id'});

ViewedSeries.sync();
module.exports = ViewedSeries;