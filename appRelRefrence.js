const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playRelation')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author'
  }
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .select('name author');
  console.log(courses);
}


async function listCoursesPopulate() { 
    const courses = await Course
      .find()
      .populate('author')
      // .populate('author', 'name')   //----> to populate certain properties
      // .populate('author', 'name -_id')   //----> to exclude a property, prefix with -
      .select('name author');
    console.log(courses);
  }

//createAuthor('Mosh', 'My bio', 'My Website');

// createCourse('Node Course', '5dbff46688d75b21e4ab6ad2')

// listCourses();

listCoursesPopulate();