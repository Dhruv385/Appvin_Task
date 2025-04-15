const { Kafka } = require("kafkajs");

const consumer = Kafka.consumer({groupId: 'test-group'});

await consumer.connect();
await consumer.subscribe({topic: 'test-topic', frombeginning: true});

await consumer.run({
    eachMessage: async({topic, partition, message}) => {
        console.log({value: message.value.toString()});
    }
});
