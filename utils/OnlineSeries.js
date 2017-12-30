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

    return OnlineSeries.update(JSON.parse(jsonSeries), {where: {id: JSON.parse(jsonSeries).id}}).then((result) => {
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
                return ViewedSeriesDefenition.create({seriesId:id, userId: uid, time:0, fluid:0, duration:0}).then(series=>{
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
OnlineSeries.prototype.getSeasonForUser = function (numOfSeason, uid) {
    let temp = [];
    return OnlineSeries.findAll({where: { numOfSeazon:numOfSeason} })
        .then(value => {
            let arrayOfPromises = value.map(element => {
                return ViewedSeriesDefenition.findOne({where: {userId: uid, seriesId: element.dataValues.id}}).then(data=>{
                    if(data){
                        element.dataValues.viewed=data.dataValues;
                    }
                    temp.push(element.dataValues);
                    }
                )
            });
            return Promise.all(arrayOfPromises);
        }).then((op)=>{
            console.log(op);
            console.log('Данные___'+JSON.stringify(temp));
            return (temp);
        }).catch(error => {
            console.log(error);
            return {
                status: 'error',
                data: error
            }
        });
};
OnlineSeries.prototype.getAllForUser = function (uid) {
    let temp = [];
    return OnlineSeries.findAll({order: [['numOfSeazon', 'DESC'],['numOfSer', 'DESC']]})
        .then(value => {
            let arrayOfPromises = value.map(element => {
                return ViewedSeriesDefenition.findOne({where: {userId: uid, seriesId: element.dataValues.id}}).then(data=>{
                    if(data){
                        element.dataValues.viewed=data.dataValues;
                    }
                    temp.push(element.dataValues);
                    }
                )
            });
            return Promise.all(arrayOfPromises);
        }).then((op)=>{
            console.log(op);
            console.log('Getting ALL for user'+JSON.stringify(temp));
            return (temp);
        }).catch(error => {
            console.log(error);
            return {
                status: 'error',
                data: error
            }
        });
};
OnlineSeries.prototype.updateTimeForUser = function (id, uid, time, fluid, duration) {
    let haveSeen=false;
    if(fluid>91.01){
        haveSeen=true;
    }
    return ViewedSeriesDefenition.update({time: time, fluid: fluid, duration: duration, haveSeen: haveSeen}, {where: {seriesId: id, userId: uid}}).then((result) => {
        if (result){
            return 'success';
        }else{
            return 'this element doesn\'t exist';
        }
    });
};
OnlineSeries.prototype.updateHaveSeenForUser = function (id, uid) {
    return ViewedSeriesDefenition.findOne({where: {seriesId: id, userId: uid}}).then(result=>{
        if (!result){
            return ViewedSeriesDefenition.create({seriesId:id, userId: uid, time:0, fluid:0, duration:0, haveSeen: true})
                .then(series => {
                    if (!series) {
                        return {status: undefined};
                    }
                    return {status: 'success'};
                })
                .catch(error => {
                    return {status: error};
                });
        }else{
            return ViewedSeriesDefenition.update({haveSeen: !result.haveSeen}, {where: {seriesId: id, userId: uid}})
                .then(series => {
                    if (!series) {
                        return {status: undefined};
                    }
                    return {status: 'success'};
                })
                .catch(error => {
                    return {status: error};
                });
            }
    })
};

module.exports = OnlineSeries;