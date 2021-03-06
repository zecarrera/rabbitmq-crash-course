const amqp = require("amqplib"); //amqp - advanced message queue protocol

const port = 5672;
const server = "localhost";
const message = {number: process.argv[2] || 0}; //reads user parameter from terminal, if unset default is 0 
connect();
async function connect() {
    try {
        const connection = await amqp.connect(`amqp://${server}:${port}`);
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs"); //verifies you have a queue
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(message)));
        console.log(`job sent successfully ${message.number}`);
    } catch (e) {
        console.log(e);
    }   
}