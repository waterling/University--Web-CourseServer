const express = require('express');
const Map = require('../utils/Map');
const bodyParser = require('body-parser');

let router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

//for fun:)
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

//get all, one,
router.get('/:id',function (req, res) {
    let map = new Map;
    console.log('Get param id (chars with offset): ' + req.params.id);
        map.getAllPlacemark().then(data => {
            console.log(data);
            res.send(data);
        });
});

router.delete('/:id',function (req, res) {

});

router.post('/admin/:id', function (req, res) {

});



module.exports = router;