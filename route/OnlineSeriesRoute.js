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
    if (req.query.numOfSeazon) {
        onlineSeries.getSeason(req.query.numOfSeazon).then(data => {
            onlineSeriesQueues.doResponseOnlineSeries(req.params.id, data);
        })
    } else {
        onlineSeries.getAllSeries().then(data => {
            onlineSeriesQueues.doResponseOnlineSeries(req.params.id, data);
        })
    }
});


router.post('/admin/:id', function (req, res) {
    let onlineSeries = new OnlineSeries;
    onlineSeries.addSeries(req.body).then(data=>{
        onlineSeriesQueues.doResponseOnlineSeries(req.params.id, data);
    });
});

module.exports = router;