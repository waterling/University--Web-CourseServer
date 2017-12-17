const express = require('express');
const Characters = require('../utils/Characters');
const CharactersQueues = require('../queues/CharactersQueues');
const bodyParser = require('body-parser');

let charactersQueues = new CharactersQueues;
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
    let chars = new Characters;
    console.log('Get param id (chars with offset): ' + req.params.id);
    if(req.query.count && req.query.offset){
        chars.getCharactersWithOffset(parseInt(req.query.offset), parseInt(req.query.count)).then(data => {
            console.log(data);
            res.send(data);
        });
    }else {
        if (req.query.id) {
            chars.getCharacter(req.query.id).then(data => {
                res.send(data);
                console.log('Отправлен полный контент Id: ' + req.query.id);
            })
        }
    }
});

router.delete('/:id',function (req, res) {

});

router.post('/admin/:id', function (req, res) {

});



module.exports = router;