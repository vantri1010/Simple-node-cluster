const amqp = require("amqplib");
const fabObj = require("../math-logic/fibonacci-series");

async function sendValueInFabQueue1(num) {
    try {
        const connection = await amqp.connect("amqp://192.168.1.4:5672");
        const channel = await connection.createChannel();

        const queueName = "FabSeries1";
        const fabNum = fabObj.calculateFibonacciValue(num);

        await channel.assertQueue(queueName, { durable: false });
        await channel.sendToQueue(queueName, Buffer.from(fabNum.toString()));

        console.log(`Queue Name is: ${queueName}`);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

module.exports = sendValueInFabQueue1;