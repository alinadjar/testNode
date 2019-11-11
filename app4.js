const express = require('express');
const app = express();

const port = 2000;

// view engine setup
app.set('views', './views');
app.set('view engine', 'pug');



app.get('/', function (req, res) {
  //throw new Error('BROKEN') // Express will catch this on its own.
  res.status(200).send('OK');
})

app.get('/ind', function (req, res, next) {
  //next('some error');
  let x = 737 / parseFloat(0);
  console.log(x);
  res.end();
})


app.get('/indCatch', function (req, res, next) {
  setTimeout(function () {
    try {
      throw new Error('BROKEN')
    } catch (err) {
      next(err)
    }
  }, 100)
})


app.get('/indPromise', function (req, res, next) {
  Promise.resolve().then(function () {
    throw new Error('BROKEN')
  }).catch(next) // Errors will be passed to Express.
})







app.use(function (err, req, res, next) {
  console.error(err.stack)
  //res.status(500).send('Something broke!')
  res.render('error', { err: err.stack });
  //next(err);
})



console.log(`current environment: ${app.get('env')}`);


if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    console.log('-----------------------------------');
    res.status(err.status || 500);
    res.render('error', {
      err: err.stack,
      //message: err.message
    });
  });
}



app.listen(port, () => console.log(`Example app listening on port ${port}!`))