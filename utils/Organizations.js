'use strict';

const Organizations = require('../defenitions/OrganizationDefenition');
const ListOfWorkers = require('../defenitions/ListOfWorkersDefenition');
const Characters = require('../defenitions/CharacterDefenition');
const OrganizationHistory = require('../defenitions/OrganizationsHistoryDefenition');
const OrganizationsRelationships = require('../defenitions/OrganizationsRelationshipsDefenition');
const sequelize = require('sequelize');

Organizations.prototype.getAllOrganizations = function () {
    return Organizations.findAll()
        .then(value => {
            let temp = [];
            value.map(element => {
                temp.push(element.dataValues)
            });
            console.log('All Organizations: '+JSON.stringify(temp));
            return temp;
        }).catch(error => {

        return {

            status: 'error',

            data: error

        }

    });
};

Organizations.prototype.getOrganization = function (num) {
    Organizations.findAll({where: {id: num}})
        .then(value => {
            let temp = new Array(value.length);
            let i = 0;
            value.map(element => {
                temp[i] = (element.dataValues);
                i++;
            });
            return temp;
        }).catch(error => {

        return {

            status: 'error',

            data: error

        }

    });
};

Organizations.prototype.addOrganization = function (jsonOrganization) {
    Organizations.create(JSON.parse(jsonOrganization))
        .then(news => {
            if (!news) {
                return {status: undefined};
            }
            return {status: 'success'};
        })
        .catch(error => {
            return {status: error};
        });
};

Organizations.prototype.updateOrganization = function (jsonOrganization) {
    let temp = JSON.parse(jsonOrganization);
    console.log(temp);
    Organizations.update({
        title: temp.title,
        content: temp.content,
        imgURL: temp.imgURL
    }, {where: {id: temp.id}}).then((result) => {
        console.log(result);
    });

};
Organizations.prototype.getListOfWorkers = function (id) {
    ListOfWorkers.findAll({where: {organizationId: id}})
        .then(value => {
            let temp = new Array(value.length);
            let i = 0;
            value.map(element => {
                Characters.findOne({where: {id: element.dataValues.charId}})
                    .then(value => {
                        temp[i] = value.dataValues;
                    });
                i++;
            });
            return temp;
        });
};
Organizations.prototype.getOrganizationsHistory = function (id) {
    OrganizationHistory.findAll({where: {charId: id}})
        .then(value => {
            let temp = new Array(value.length);
            let i = 0;
            value.map(element => {
                temp[i] = (element.dataValues);
                i++;
            });
            return temp;
        }).catch(error => {

        return {

            status: 'error',

            data: error

        }

    });
};

Organizations.prototype.getByType = function (orgId, type) {
    OrganizationsRelationships.findAll({
        where: {
            type: type,
            [sequelize.Op.or]: [
                {orgId1: orgId},
                {orgId2: orgId}
            ]
        }
    })
        .then(values => {
            let temp = new Array(values.length);
            let i = 0;
            values.map(element => {
                if (element.dataValues.orgId1 === orgId) {
                    temp[i] = (element.dataValues.orgId2);
                } else {
                    temp[i] = (element.dataValues.orgId1);
                }
                i++;
            });
            let tempOrganizations = new Array(temp.length);
            i = 0;
            temp.map(tempId => {
                Organizations.findOne({where: {id: tempId}})
                    .then(org => {
                        tempOrganizations[i] = org.dataValues;
                        i++;
                    });
            });
            return tempOrganizations;
        });
};

Organizations.prototype.getEnemies = function (id) {
    Organizations.prototype.getByType(id, 'enemy');
};
Organizations.prototype.getFriends = function (id) {
    Organizations.prototype.getByType(id, 'friend');
};

module.exports = Organizations;