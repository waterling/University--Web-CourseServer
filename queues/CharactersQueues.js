'use strict';

const amqp = require('amqplib/callback_api');

class CharactersQueues {
    doResponseCharacters(charId, data) {
        amqp.connect('amqp://localhost', function (err, conn) {
            conn.createChannel(function (err, ch) {
                const qName = 'chars_' + charId;
                ch.assertQueue(qName, {durable: false, autoDelete: true});
                ch.sendToQueue(qName, new Buffer(JSON.stringify(data)));
            })
        });
    };
}

module.exports = CharactersQueues;