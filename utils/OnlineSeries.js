'use strict';

const OnlineSeries = require('../defenitions/OnlineSeriesDefenition');

const User = require('../defenitions/UserDefinition');
const ViewedSeriesDefenition = require('../defenitions/ViewedSeriesDefenition');

OnlineSeries.prototype.getAllSeries = function () {
    return OnlineSeries.findAll()
        .then(value => {
            let temp = [];
            value.map(element => {
                temp.push(element.dataValues);
            });
            return temp;
        }).catch(error => {

        return {

            status: 'error',

            data: error

        }

    });
};

OnlineSeries.prototype.getSeason = function (num) {
    return OnlineSeries.findAll({where: {numOfSeazon: num}, order: [['numOfSer', 'DESC']]})
        .then(value => {
            let temp = [];
            value.map(element => {
                temp.push(element.dataValues);
            });
            return temp;
        }).catch(error => {
        return {
            status: 'error',
            data: error
        }
    });
};

OnlineSeries.prototype.addSeries = function (jsonSeries) {
    return OnlineSeries.create(JSON.parse(jsonSeries))
        .then(series => {
            if (!series) {
                return {status: undefined};
            }
            return {status: 'success'};
        })
        .catch(error => {
            return {status: error};
        });
};

OnlineSeries.prototype.getLastSeries = function (num) {
    return OnlineSeries.findAll({limit: num, order: [['numOfSeazon', 'DESC'],['numOfSer', 'DESC']]})
        .then(value => {
            console.log('__________FindLastSeries__________');
            let temp =[];
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

OnlineSeries.prototype.updateSeries = function (jsonSeries) {
    return OnlineSeries.update(JSON.parse(jsonSeries), {where: {id: temp.id}}).then((result) => {
        if (result){
            return 'success';
        }else{
            return 'this element doesn\'t exist';
        }
    });

};

OnlineSeries.prototype.getSeriesById = function (id) {
    return OnlineSeries.find({where: {id: id}})
        .then(value => {
            return value;
        }).catch(error => {
            return {
                status: 'error',
                data: error
            }
        });
};

OnlineSeries.prototype.getSeriesByIdForUser = function (id, uid) {
    return ViewedSeriesDefenition.find({include:[{model: OnlineSeries, as: 'series', where: { id: id }}], where: { userId:uid} })
        .then(value => {
            if(value){
                console.log("getSeriesByIdForUser: "+JSON.stringify(value));
                return value;
            }else {
                return ViewedSeriesDefenition.create({seriesId:id, userId: uid, time:0}).then(series=>{
                    console.log("Created Viewed: "+JSON.stringify(series));
                    return ViewedSeriesDefenition.find({include:[{model: OnlineSeries, as: 'series', where: { id: id }}], where: { userId:uid} }).then(value=>{
                        return value;
                    });
                })
            }
        }).catch(error => {
            console.log(error);
            return {
                status: 'error',
                data: error
            }
        });
};

OnlineSeries.prototype.updateTimeForUser = function (id, uid, time) {
    return ViewedSeriesDefenition.update({time: time}, {where: {seriesId: id, userId: uid}}).then((result) => {
        if (result){
            return 'success';
        }else{
            return 'this element doesn\'t exist';
        }
    });
};

module.exports = OnlineSeries;