const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { response } = require("express");

const packageDef = protoLoader.loadSync("product.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;
const client = new todoPackage.Todo("localhost:40000", grpc.credentials.createInsecure())

client.createTodo({
    "text": "Do something"
}, (err, response) => {
    if (err) {
        console.error("Error:", err);
        return;
    }
    console.log("Received from the server:", response);
});

client.readTodos({}, (err, response) => {
    console.log("Received from server " + JSON.stringify(response));
})