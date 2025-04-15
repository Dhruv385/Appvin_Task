const express = require('express');
const grpc = require('@grpc/grpc-js');
const protoloader = require('@grpc/proto-loader');
const path = require('path');

const protoPath = path.join(__dirname, 'product.proto');
const packageDefinition = protoloader.loadSync(protoPath);
const proto = grpc.loadPackageDefinition(packageDefinition).product;

const app = express();
app.use(express.json());
const port = 3000;

const client1 = new proto.ServiceA('localhost:3001', grpc.credentials.createInsecure())
const client2 = new proto.ServiceB('localhost:3002', grpc.credentials.createInsecure())

app.post('/serviceA', (req,res)=>{
    // const query = req.query.query;
    client1.RequestData({ query:  req.query.query}, (err,response)=>{
        if(err){
            return res.send(err.message);
        }
        console.log(response);
        res.json(`Service A response ${response.result}`);
    });
});

app.post('/serviceB', (req,res)=>{
    // const query = req.query.query;
    client1.RequestData({ query: req.query.query }, (err,response)=>{
        if(err){
            return res.send(err.message);
        }
        res.send(`Service B response ${response.result}`);
    });
});

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})