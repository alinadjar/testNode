const express = require('express');
const app = express();

const port = 2000;


app.use('/Contact',function (req, res, next) {
    console.log('Only Before Calling ==>  Get /Contact:', Date.now())
    next()
})

app.use(function(req, res, next){
    console.log('general middleware');
    //next('router');
    next();
})

app.get('/Contact', (req, res, next) => {
    res.send('Hello World!');
    next('router');
});


app.get('/index', (req, res) => {
    res.send('response from index');    
});


app.use('/Contact', function (req, res, next) {
    console.log('Only After Calling ==>  Get /Contact:', Date.now())
    next();
});


// middleware only befor /user/:id
app.get('/user/:id', function (req, res, next) {
    console.log('ID:', req.params.id)
    next()
  }, function (req, res, next) {
    res.send('User Info')
    next()
  })

  // middleware only after /user/:id
  app.use('/user/:id', function (req, res, next) {
    console.log('Only After Calling ==>  Get /user/:id', Date.now())
    next();
});





app.listen(port, () => console.log(`Example app listening on port ${port}!`))