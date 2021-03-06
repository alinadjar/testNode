const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;





if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Online is emitted whenever a worker is forked and ready to receive incoming requests. 
    cluster.on('online', function (worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died with code ${code}, and signal ${signal}`);
        //console.log('Starting a new worker');
        //cluster.fork();
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    // http.createServer((req, res) => {
    //     res.writeHead(200);
    //     res.end('hello world\n');
    // }).listen(8000);





    const app = require('express')();

    app.get('/', (req, res) => {
        console.log(`Worker ${process.pid} <===================`);
        res.send('Hello World!');
    });

    http.createServer(app).listen(8000, () => { console.log('Express Listening on 8000'); });

    console.log(`Worker ${process.pid} started`);
}