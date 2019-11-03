const Joi = require('joi');
const logger = require('./middleware/Logger');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true})); 
// parses request with url-encoded payload ==> means request with body like this: key=value&key=value 
//like when you post html form, thbody of the request will be like that.



console.log(`NODE_ENV:  ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

if(app.get('env') === 'production'){
    app.use(logger);
    console.log('custom logger enabled.');
}


const courses = [
    {id:1, name: 'Course1'},
    {id:2, name: 'Course2'},
    {id:3, name: 'Course3'},
];


// query string
// Get /api/qs/2019/09/?SortBy=Name
app.get('/api/qs/:year/:month', (req, res) => {
    res.send(req.query);
    //res.send(req.params);
});


app.get('/api/courses', (req, res) => {
    res.send(courses);
});


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    console.log(course);
    if(! course) {
        res.status(404).send('Course Not Found');
    }

    res.send(course);
});


app.post('/api/courses/', (req, res) => {

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    console.log(result);


    if(result.error){
        //res.status(400).send(result.error);
        res.status(400).send(result.error.details[0].message);
        return;
    }


    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    

    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    console.log(course);
    if(! course) {
        res.status(404).send('Course Not Found');
    }


    //const result = validateCourse(req.body); //---> returns error and value property
    const {error} = validateCourse(req.body);
    if(error){
        //res.status(400).send(result.error);
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
})


function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    
    return Joi.validate(course, schema);
}


//console.log(process.env.PORT );
const port =  process.env.PORT || 2000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));




