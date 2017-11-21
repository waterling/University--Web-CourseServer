'use strict';

const Stimulants = require('../defenitions/StimulantDefenition');

Stimulants.prototype.getAllStimulants = function () {
    Stimulants.findAll()
        .then(value => {
            let temp = new Array(value.length);
            let i = 0;
            value.map(element => {
                temp[i] = (element.dataValues);
                i++;
            });
        }).catch(error => {

        return {

            status: 'error',

            data: error

        }

    });
};

Stimulants.prototype.getStimulant = function (num) {
    Stimulants.findAll({where: {id: num}})
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

Stimulants.prototype.addStimulant = function (jsonStimulant) {
    Stimulants.create(JSON.parse(jsonStimulant))
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

Stimulants.prototype.updateStimulant = function (jsonStimulant) {
    let temp = JSON.parse(jsonStimulant);
    console.log(temp);
    Stimulants.update({
        title: temp.title,
        content: temp.content,
        imgURL: temp.imgURL
    }, {where: {id: temp.id}}).then((result) => {
        console.log(result);
    });

};
module.exports = Stimulants;