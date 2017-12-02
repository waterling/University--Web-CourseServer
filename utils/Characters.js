'use strict';

const Character = require('../defenitions/CharacterDefenition');
const Stimulant = require('../defenitions/StimulantDefenition');
const CharacterUsesStimulant = require('../defenitions/CharsUseStimulantsDefenition');
const CharactersRelationship = require('../defenitions/CharactersRelationshipDefinition');
const CharsHistory = require('../defenitions/CharsHistoryDefenition');
const InterestingFact = require('../defenitions/InterestingFactsDefeniton');
const sequelize = require('sequelize');

Character.prototype.getAllCharacters = function () {
    Character.findAll()
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

Character.prototype.getCharactersWithOffset = function (offset, num) {
    return Character.findAll({limit: num, offset: offset, order: [['firstName', 'DESC']]})
        .then(value => {
            console.log('__________FindCharsWithOffset__________');
            let temp = [];
            value.map(element => {
                temp.push(element.dataValues);
            });
            console.log(temp);
            return temp;
        }).catch(error => {

            return {

                status: 'error',

                data: error

            }

        });
};
Character.prototype.getCharacter = function (num) {
    Character.findAll({where: {id: num}})
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

Character.prototype.addCharacter = function (jsonCharacter) {
    Character.create(JSON.parse(jsonCharacter))
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

Character.prototype.updateCharacter = function (jsonCharacter) {
    let temp = JSON.parse(jsonCharacter);
    console.log(temp);
    Character.update({
        title: temp.title,
        content: temp.content,
        imgURL: temp.imgURL
    }, {where: {id: temp.id}}).then((result) => {
        console.log(result);
    });

};

Character.prototype.getUsesStimulant = function (charId) {
    CharacterUsesStimulant.findAll({where: {charId: charId}})
        .then(values => {
            let temp = new Array(values.length);
            let i = 0;
            values.map(element => {
                temp[i] = (element.dataValues.id);
                i++;
            });
            let tempStimulant = new Array(temp.length);
            i = 0;
            temp.map(tempId => {
                Stimulant.findOne({where: {id: tempId}})
                    .then(stim => {
                        tempStimulant[i] = stim.dataValues;
                        i++
                    })
            });
            return tempStimulant;
        });
};

Character.prototype.getByType = function (charId, type) {
    CharactersRelationship.findAll({
        where: {
            type: type,
            [sequelize.Op.or]: [
                {charId1: charId},
                {charId2: charId}
            ]
        }
    })
        .then(values => {
            let temp = new Array(values.length);
            let i = 0;
            values.map(element => {
                if (element.dataValues.charId1 === charId) {
                    temp[i] = (element.dataValues.charId2);
                } else {
                    temp[i] = (element.dataValues.charId1);
                }
                i++;
            });
            let tempCharacters = new Array(temp.length);
            i = 0;
            temp.map(tempId => {
                Character.findOne({where: {id: tempId}})
                    .then(char => {
                        tempCharacters[i] = char.dataValues;
                        i++;
                    });
            });
            return tempCharacters;
        });
};

Character.prototype.getEnemies = function (id) {
    Character.prototype.getByType(id, 'enemy');
};

Character.prototype.getFriends = function (id) {
    Character.prototype.getByType(id, 'friend');
};

Character.prototype.getHistory = function (id) {
    CharsHistory.findAll({where: {charId: id}})
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

Character.prototype.getInterestingFacts = function (id) {
    InterestingFact.findAll({where: {charId: id}})
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

module.exports = Character;