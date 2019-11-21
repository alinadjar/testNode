const express = require('express');
const morgan = require('morgan');
const app = express();


const port = 2000;

morgan.token('myhost', function(req, res) {
	return req.hostname;
});

app.use(morgan(':myhost :method :url :status :res[content-length] - :response-time ms Hey.....:)'));
app.use(morgan('dev'));
app.use(morgan('tiny'));
//app.use(morgan('combined'));



app.use(function (req, res, next) {
    console.log('Before Calling ==>  Get /:', Date.now())
    next()
})

app.get('/', (req, res, next) => {
    res.send('Hello World!');
    //next('route');
    next();
});


// app.get('/index', (req, res) => {
//     res.send('response from index');    
// });


app.use(function (req, res, next) {
    console.log('After Calling ==>  Get /:', Date.now());
    console.log('-------------------------------------------------------------------');    
});







app.listen(port, () => console.log(`Example app listening on port ${port}!`))