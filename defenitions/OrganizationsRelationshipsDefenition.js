'use strict';

const DataTypes = require("sequelize");
const Organizations = require('./OrganizationDefenition');
const connection = require('../connections/DataBaseConnect');

const OrganizationsRelationship = connection.define('OrganizationsRelationship', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orgId1: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orgId2: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM,
        values: ['enemy', 'friend']
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

Organizations.hasMany(OrganizationsRelationship, {foreignKey: 'orgId1', sourceKey: 'id'});
Organizations.hasMany(OrganizationsRelationship, {foreignKey: 'orgId2', sourceKey: 'id'});

OrganizationsRelationship.sync();
module.exports = OrganizationsRelationship;