'use strict';

const Map = require('../defenitions/MapDefinition');
const sequelize = require('sequelize');

Map.prototype.getAllPlacemark= function(){
    return Map.findAll().then(value => {
        console.log('__________FindAllPlaceMark__________');
        let temp=[];
        value.map(element => {
            temp.push(element.dataValues);
        });
        return (temp);
    });
};

module.exports = Map;