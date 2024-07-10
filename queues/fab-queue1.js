const rq = require("amqplib");

const fabObj = require("../math-logic/fibonacci-series");


function sendValueInFabQueue1(num) {
    rq.connect("amqp://192.168.1.4:5672", (err, connection) => {
        if (err) process.exit();
        const queueName = "FabSeries1";
        connection.createChannel((error, channel) => {
            if (error) {
                console.log(error);
                process.exit();
            }
            else {
                let fabNum = fabObj.calculateFibonacciValue(num);
                channel.assertQueue(queueName, { durable: false });
                channel.sendToQueue(queueName, Buffer.from(fabNum.toString()));
                console.log(`Queue Name is - ${queueName}`);
            }
        });
    });
}

module.exports = sendValueInFabQueue1;