const express = require('express');
const News = require('../utils/News');
const NewsQueues = require('../queues/NewsQueues');
const bodyParser = require('body-parser');
const config = require('../etc/config.json');
const Busboy = require('busboy');
const fs = require('fs');

let imageURL;
let newsQueues = new NewsQueues;
let router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
//for fun:)
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.all('/uploadfile', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
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
//get all or get last {count} news +
router.get('/:id', function (req, res) {
    let news = new News;
    console.log('Get param id: ' + req.params.id);
    if(req.query.count && req.query.offset){
        console.log('Взять последние co сдвигом : ' + req.query.count);
        news.getNewsWithOffset(parseInt(req.query.offset), parseInt(req.query.count)).then(data => {
            res.send(data);
        });
    }else{
        if (req.query.count) {
            console.log('Взять последние: ' + req.query.count);
            news.getLastNews(parseInt(req.query.count)).then(data => {
                res.send(data);
                newsQueues.doResponseNews(req.params.id, data);
            });
        } else {
            if(req.query.id){
                news.getNews(req.query.id).then(data=>{
                    res.send(data);
                    console.log('Отправлен полный контент Id: '+ req.query.id);
                })
            }else{
                news.getAllNews().then(data => {
                    res.send(data);
                    console.log('Взятые даннаые (getAllNews): ' + data);
                    newsQueues.doResponseNews(req.params.id, data);
                });
            }
        }
    }

});

//delete news by id in query +
router.delete('/admin/:id', function (req, res) {
    let news = new News;
    if (req.query.id) {
        news.deleteNews(req.query.id).then(data => {
            if (data) {
                res.send(data);
                newsQueues.doResponseNews(req.params.id, data);
            } else {
                res.end();
            }
        });

    }
});

//update news or create if not exist +
router.post('/admin/:id', function (req, res) {
    let news = new News;
    console.log('ПОулчил add');

    if (req.body) {
        if (req.body.id) {
            //update
            let newsForUpdate = req.body;
            console.log(imageURL);
            newsForUpdate.imgURL = imageURL;
            console.log(newsForUpdate);
            console.log('Add Update');
            news.updateNews(JSON.stringify(newsForUpdate)).then(data=>{
                newsQueues.doResponseNews(req.params.id, data);
            });
        } else {
            //create
            console.log('Add Create');
            req.body.imgURL = imageURL;
            console.log(req.body);
            news.addNews(JSON.stringify(req.body)).then(data=>{
                res.send(data);
                // newsQueues.doResponseNews(req.params.id, data);
            });
        }
    }
});

module.exports = router;