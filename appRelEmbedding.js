const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playEmbedding')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
//   author: {
//       typr: authorSchema,
//       required: true
//   }
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseID) {
    const course = await Course.findById(courseID);
    course.author.name = 'Mosh Hamedani';
    course.save();
}


async function updateAuthorII(courseID) {
    const course = await Course.update({ _id: courseID }, {
        $set: {
            'author.name': 'John Smith'
        }
    });    
}


async function removeAuthorProperty(courseID) {
    const course = await Course.update({ _id: courseID }, {
        $unset: {
            'author': ''
        }
    });    
}


//createCourse('Node Course', new Author({ name: 'Mosh' }));
//createCourse('Node Course', [new Author({ name: 'Mosh' }), new Author({ name: 'John' })]);

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}


//addAuthor('5dc00f8a7e28642664ecceaa', new Author({ name: 'Amy'}));


async function removeAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    const author = course.authors.id(courseId);
    author.remove();
    course.save();
}


//removeAuthor('5dc00f8a7e28642664ecceaa', '');

//listCourses();

//updateAuthor('5dc0015a7d30a229c48e2bac');
//updateAuthorII('5dc0015a7d30a229c48e2bac');
// removeAuthorProperty('5dc0015a7d30a229c48e2bac');



