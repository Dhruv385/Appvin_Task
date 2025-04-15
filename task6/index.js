// import bodyParser from "body-parser";
// import express from "express";
// import controllers from "./controller";
// import KafkaConfig from "./config";

// const app = express();
// const jsonParser = bodyParser.json();

// app.post('/api/send',jsonParser, controllers.sendMessagetoKafka)

// const kafkaConfig = new KafkaConfig();
// kafkaConfig.consume('my-topic',(value)=>{
//     console.log(value)
// })
// app.listen(8080, ()=>{
//     console.log('Server is running at port 8080');
// });

const Kafka = require('kafkajs');
const kafka= new Kafka({
    clientId: 'my-app',
    brokers: ['172.50.5.85'],
});

module.exports = Kafka;
