// function sayHello(){
//     console.log('Hello');
//     console.log(module);
//     console.log(global);
// }

// sayHello();


const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('Hello World');
        res.end();
    }

});
server.on('connection', (socket) => {
    console.log('New Connection ...');
});

server.listen(4000);
console.log('Listening on port 4000');