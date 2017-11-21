'use strict';

const AboutSerial = require('../defenitions/AboutSerialDefenition');

AboutSerial.prototype.getDescription = function () {
    AboutSerial.findAll()
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


AboutSerial.prototype.addDescription = function (jsonSeries) {
    AboutSerial.create(JSON.parse(jsonSeries))
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

AboutSerial.prototype.updateDescription = function (jsonSeries) {
    let temp = JSON.parse(jsonSeries);
    console.log(temp);
    AboutSerial.update({
        title: temp.title,
        content: temp.content,
        imgURL: temp.imgURL
    }, {where: {id: temp.id}}).then((result) => {
        console.log(result);
    });

};
module.exports = AboutSerial;