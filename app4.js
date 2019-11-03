const express = require('express');
const app = express();

const port = 2000;

app.get('/', function (req, res) {
    throw new Error('BROKEN') // Express will catch this on its own.
})

app.get('/ind', function (req, res, next) {
    //next('some error');
    let x = 737/parseFloat(0);
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



app.set('views', './views');
app.set('view engine', 'pug');
app.use(function (err, req, res, next) {
    console.error(err.stack)
    //res.status(500).send('Something broke!')
    res.render('error', { err: err.stack  })
  })



app.listen(port, () => console.log(`Example app listening on port ${port}!`))