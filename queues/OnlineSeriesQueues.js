'use strict';

const amqp = require('amqplib/callback_api');


class OnlineSeriesQueues {

    doResponseOnlineSeries(osId, data) {

        amqp.connect('amqp://localhost', function (err, conn) {

            conn.createChannel(function (err, ch) {

                const qName = 'onser_' + osId;


                ch.assertQueue(qName, {durable: false, autoDelete: true});

                ch.sendToQueue(qName, new Buffer(JSON.stringify(data)));


            })

        });

    };


}


module.exports = OnlineSeriesQueues;