'use strict';

const DataTypes = require("sequelize");
const Characters = require('./CharacterDefenition');
const Organizations = require('./OrganizationDefenition');
const connection = require('../connections/DataBaseConnect');

const ListOfWorkers = connection.define('ListOfWorkers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    charId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    organizationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    post: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

Characters.hasMany(ListOfWorkers, {foreignKey: 'orgId', sourceKey: 'id'});
Organizations.hasMany(ListOfWorkers, {foreignKey: 'organizationId', sourceKey: 'id'});

ListOfWorkers.sync();
module.exports = ListOfWorkers;