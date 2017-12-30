const express = require('express');
const OnlineSeries = require('../utils/OnlineSeries');
const OnlineSeriesQueues = require('../queues/OnlineSeriesQueues');
const bodyParser = require('body-parser');
const config = require('../etc/config.json');
const Busboy = require('busboy');
const fs = require('fs');

let imageURL;
let onlineSeriesQueues = new OnlineSeriesQueues;
let router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

//for fun:)
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

//get all and get season
router.get('/:id', function (req, res) {
    let onlineSeries = new OnlineSeries;
    console.log(req.query);
    if (req.query.numOfSeason) {
        if (req.query.uid) {
            onlineSeries.getSeasonForUser(req.query.numOfSeason, req.query.uid).then(data=>{
                console.log('Get season for: '+req.query.numOfSeason+' User: ' + req.query.uid);
                console.log('Data from getting:     '+data);
                res.send(data);
            })
        }else{
            onlineSeries.getSeason(req.query.numOfSeason).then(data => {
                console.log('Get season: ' + req.query.numOfSeason);
                res.send(data);
                // onlineSeriesQueues.doResponseOnlineSeries(req.params.id, data);
            })
        }

    } else {
        if (req.query.count) {
            console.log('Взять последние: ' + req.query.count);
            onlineSeries.getLastSeries(parseInt(req.query.count)).then(data => {
                res.send(data);
            });
        } else {
            if (req.query.id && req.query.uid && req.query.time) {
                onlineSeries.updateTimeForUser(parseInt(req.query.id), parseInt(req.query.uid), parseInt(req.query.time), parseFloat(req.query.fluid), parseFloat(req.query.duration)).then(data => {
                    console.log("Update Time: " + data);
                    res.send(data);
                });
            } else {
                if (req.query.id && req.query.uid && req.query.haveSeen) {
                    console.log('have seen -________________________________-');
                    onlineSeries.updateHaveSeenForUser(parseInt(req.query.id), parseInt(req.query.uid),req.query.haveSeen).then(data => {
                        res.send(data);
                    });
                } else {
                    if (req.query.id && req.query.uid) {
                        console.log('Взять по иду: ' + req.query.id + 'Для пользователя: ' + req.query.uid);
                        onlineSeries.getSeriesByIdForUser(parseInt(req.query.id), parseInt(req.query.uid)).then(data => {
                            res.send(data);
                        });
                    } else {
                        if (req.query.id) {
                            console.log('Взять по иду: ' + req.query.id);
                            onlineSeries.getSeriesById(parseInt(req.query.id)).then(data => {
                                console.log("Это попросил: " + JSON.stringify(req.session));
                                res.send(data);
                            });
                        } else {
                            onlineSeries.getAllForUser(req.query.uid).then(data => {
                                console.log('Получил запрос');
                                res.send(data)
                            })
                        }
                    }
                }
            }
        }
    }
});


router.post('/admin/:id', function (req, res) {
    let onlineSeries = new OnlineSeries;
    if (req.body) {
        if (req.body.id) {
            //update
            let seriesForUpdate = req.body;
            seriesForUpdate.imgURL = imageURL;
            onlineSeries.updateSeries(JSON.stringify(seriesForUpdate)).then(data => {
                res.send(data);
            });
        } else {
            //create
            req.body.imgURL = imageURL;
            onlineSeries.addSeries(JSON.stringify(req.body)).then(data => {
                res.send(data);
            });
        }
    }
});

router.post('/uploadfile', (req, res) => {
    const busboy = new Busboy({headers: req.headers});
    busboy.on('file', function (fieldname, file, filename) {
        imageURL = fieldname + '-' + Date.now() + filename;
        let saveTo = config.folderForFiles + '/uploads/' + imageURL;
        file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', function () {
        res.end('done');
    });
    res.on('close', function () {
        req.unpipe(busboy);
    });
    req.pipe(busboy);
});

module.exports = router;