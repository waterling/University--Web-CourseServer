const express = require('express');
const OnlineSeries = require('../utils/OnlineSeries');
const OnlineSeriesQueues = require('../queues/OnlineSeriesQueues');
const bodyParser = require('body-parser');

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
        onlineSeries.getSeason(req.query.numOfSeason).then(data => {
            console.log('Get season: '+req.query.numOfSeason);
            res.send(data);
            // onlineSeriesQueues.doResponseOnlineSeries(req.params.id, data);
        })
    } else {
        if (req.query.count){
            console.log('Взять последние: ' + req.query.count);
            onlineSeries.getLastSeries(parseInt(req.query.count)).then(data => {
                res.send(data);
            });
        }else{
            onlineSeries.getAllSeries().then(data => {
                onlineSeriesQueues.doResponseOnlineSeries(req.params.id, data);
            })
        }
    }
});


router.post('/admin/:id', function (req, res) {
    let onlineSeries = new OnlineSeries;
    onlineSeries.addSeries(req.body).then(data=>{
        onlineSeriesQueues.doResponseOnlineSeries(req.params.id, data);
    });
});

module.exports = router;