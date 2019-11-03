const startDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const morgan = require('morgan');
const express = require('express');
const app = express();


if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startDebugger('custom logger enabled.');
}



// DB work
dbDebugger('Connected to Db ... ');

const port =  process.env.PORT || 2000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));



// set DEBUG=app:startup 
// nodemon appDebug.js




// set DEBUG=app:startup, app:db
// nodemon appDebug.js

// set DEBUG=
// nodemon appDebug.js


// set DEBUG=*   
// set DEBUG=app:*   

// DEBUG=app:* nodemon appDebug.js
