const amqp = require("amqplib");
const fabObj = require("../math-logic/fibonacci-series");

async function sendValueInFabQueue2(num) {
    try {
        const connection = await amqp.connect("amqp://127.0.0.1:5672");
        const channel = await connection.createChannel();

        const queueName = "FabSeries2";
        const fabNum = fabObj.calculateFibonacciValue(num);

        await channel.assertQueue(queueName, { durable: false });
        await channel.sendToQueue(queueName, Buffer.from(fabNum.toString()));

        console.log(`Queue Name is: ${queueName}`);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

module.exports = sendValueInFabQueue2;