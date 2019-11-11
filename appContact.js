
const express = require('express');
const app = express();

const url = require('url');

const http = require('http');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const contacts = require('./contacts');



app.get('/hello/:name', (req, res) => {
    res.send('Hello '+ req.params.name);
});


app.get('/hello', (req, res) => {
    const get_params = url.parse(req.url, true).query;

    if( Object.keys(get_params).length === 0) {
        res.end('Hello Everybody');
    }
    else{
        res.end('Hello' + get_params.name);
    }
});

//------------------------------------------------------------


app.get('/contacts', (req, res) => {

    // the second boolean argument specifies whether the query string should be parsed or not
    const get_params = url.parse(req.url, true).query; 


    if( Object.keys(get_params).length === 0) {
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(contacts.list));
    }
    else{
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(contacts.query_by_arg(get_params.arg, get_params.value)));
    }
});


app.get('/contacts/:number', (req, res) => {
    res.setHeader('content-type', 'application/json'); //----> to comply with REST principles
    res.end(JSON.stringify(contacts.query_by_phone(req.params.number)));
})


app.get('/groups', (req, res) => {
    res.format({
        'text/xml': function() {
            res.send(contacts.list_in_xml);
        },
        'application/json': function() {
            JSON.stringify(contacts.list())
        },
        'default': function(){
            res.status(406).send('NOT ACCEPTABLE');
        }
    });
});

//app.listen(3000);


// app.set('port', process.env.PORT || 3000);
//http.createServer(app).listen(app.get('port'), () => { console.log('Express Listening on 3000'); });
//http.createServer(app).listen(app.get('port');


http.createServer(app).listen(3000, () => { console.log('Express Listening on 3000'); });