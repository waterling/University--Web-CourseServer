const express = require('express');
const Characters = require('../utils/Characters');
const CharactersQueues = require('../queues/CharactersQueues');
const bodyParser = require('body-parser');
const config = require('../etc/config.json');
const Busboy = require('busboy');
const fs = require('fs');

let imageURL;
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
    let chars = new Characters;
    console.log('Получил add');

    if (req.body) {
        if (req.body.id) {
            //update
            let charsForUpdate = req.body;
            charsForUpdate.imgURL = imageURL;
            chars.updateCharacter(JSON.stringify(charsForUpdate)).then(data=>{
                res.send(data);
            });
        } else {
            //create
            console.log('Add Create');
            req.body.imgURL = imageURL;
            console.log(req.body);
            chars.addCharacter(JSON.stringify(req.body)).then(data=>{
                res.send(data);
            });
        }
    }
});

router.post('/uploadfile', (req, res) => {
    const busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename) {
        imageURL = fieldname + '-' + Date.now() + filename;
        let saveTo = config.folderForFiles+ '/uploads/' + imageURL;
        file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', function() {
        res.end('done');
    });
    res.on('close', function() {
        req.unpipe(busboy);
    });
    req.pipe(busboy);
});

module.exports = router;