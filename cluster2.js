const cluster = require('cluster');
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
    });
} else {

    const app = require('express')();

    app.get('/', (req, res) => {
        console.log(`Worker ${process.pid} <===================`);
        res.send('Hello World!');
    });

    app.listen(8000, () => { console.log('Express Listening on 8000'); });

    console.log(`Worker ${process.pid} started`);
}