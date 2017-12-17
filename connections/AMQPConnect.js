'use strict';



const config = require('../etc/config.json');

const amqp = require('amqplib/callback_api');



amqp.connect(config.amqp_host, function (err, conn) {

    conn.createChannel(function (err, ch) {

    });

});