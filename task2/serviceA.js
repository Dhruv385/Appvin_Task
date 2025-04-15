const grpc = require('@grpc/grpc-js'); 
const protoloader = require('@grpc/proto-loader');
const path = require('path');

const protoPath = path.join(__dirname, 'product.proto');
const packageDefinition = protoloader.loadSync(protoPath);
const proto = grpc.loadPackageDefinition(packageDefinition).product;

function requestDataA(call, callback){
    const query = call.request.query;
    callback(null, {result: `Service! received: ${query}`});
}

const server = new grpc.Server();
server.addService(proto.ServiceA.service, 
    {
        requestData: requestDataA
    });
server.bindAsync('0.0.0.0:3001', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error(`Failed to bind server: ${err.message}`);
        return;
    }
    console.log(`ServiceA listening on port ${port}`);
    server.start();    
});

