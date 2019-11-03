const express = require('express');
const app = express();

const port = 2000;


app.use(function (req, res, next) {
    console.log('Before Calling ==>  Get /:', Date.now())
    next()
})

app.get('/', (req, res, next) => {
    res.send('Hello World!');
    //next('route');
    next();
});


app.get('/index', (req, res) => {
    res.send('response from index');    
});


app.use(function (req, res, next) {
    console.log('After Calling ==>  Get /:', Date.now())
    next();
});







app.listen(port, () => console.log(`Example app listening on port ${port}!`))