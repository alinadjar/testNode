// function sayHello(){
//     console.log('Hello');
//     console.log(module);
//     console.log(global);
// }

// sayHello();




// const http = require('http');

// const server = http.createServer((req, res) => {
//     if(req.url === '/'){
//         res.write('Hello World');
//         res.end();
//     }

// });
// server.on('connection', (socket) => {
//     console.log('New Connection ...');
// });

// server.listen(4000);
// console.log('Listening on port 4000');



const express = require('express');
const app = express();
const port = 2000;


//---------------------<<<<<<<<<<<<<<    Middlewares   >>>>>>>>>>>>>>-------------------------
//--------------------------------------------------------------------------------------------

// e.g.: http://localhost:2000/static/text.txt
app.use('/static', express.static('public'))

//app.use(express.static(__dirname + '/public'));
//console.log(`${path.join(__dirname, 'public')}`);
console.log(`__dirname = ${__dirname}`);

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


// app.METHOD(PATH, HANDLER)
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/err', (req, res, next) => {
    setTimeout(function () {
        try {
            throw new Error('BROKEN')
        } catch (err) {
            next(err)
        }
    }, 100)
    //res.status(500).send('Something broke!')
});

app.post('/', function (req, res) {
    res.send('Got a POST request')
})


app.get('/index', function (req, res) {
    //res.sendFile('index.html', express.static('public'));  
    res.sendFile(__dirname + '/public/index.html');
})

app.set('views', './views');
app.set('view engine', 'pug');
app.get('/indexPug', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})


app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})

// http://localhost:2000/users/5/books/6
//{"userId":"5","bookId":"6"}
app.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params)
})

//http://localhost:2000/flights/tehran-mashhad
//{"from":"tehran","to":"mashhad"}
app.get('/flights/:from-:to', function (req, res) {
    res.send(req.params)
})


//http://localhost:2000/city/Iran.Yazd
//{"Country":"Iran","City":"Yazd"}
app.get('/City/:Country.:City', function (req, res) {
    res.send(req.params)
})


//To have more control over the exact string that can be matched by a route parameter, 
//you can append a regular expression
app.get('/user/:userId(\\d+)', function (req, res) {
    res.send(req.params)
})



//More than one callback function can handle a route (make sure you specify the next object). For example:
app.get('/example/b', function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
}, function (req, res) {
    res.send('Hello from B!')
})


//    res.download() 	    Prompt a file to be downloaded.
//    res.end() 	        End the response process.
//    res.json() 	        Send a JSON response.
//    res.jsonp() 	        Send a JSON response with JSONP support.
//    res.redirect() 	    Redirect a request.
//    res.render() 	        Render a view template.
//    res.send() 	        Send a response of various types.
//    res.sendFile() 	    Send a file as an octet stream.
//    res.sendStatus() 	    Set the response status code and send its string representation as the response body.




app.get('/errfake', function (req, res) {
    throw new Error('some fake error ... ');
    res.send("Hello World!");
});


app.use(function (err, req, res, next) {
    console.log(err.stack);
    next();
});

app.use(function(err, req, res, next){
    console.log('final Error ----************----- here');
    res.status(500).send({ "Error": err.stack });

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))