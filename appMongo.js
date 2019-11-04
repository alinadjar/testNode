const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
        .then( () => console.log('Connected to MongoDB...'))
        .catch( err => console.error('Could not connect to MongoDB...', err))



const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});



// Course class, to create instances from this later
const Course = mongoose.model('Course', courseSchema);



async function createCourse() {
    const courseObj = new Course({
        name: 'Node.js',
        author: 'Mosh Hamedani',
        tags: ['node', 'backend'],
        isPublished: true
    });

    const result = await courseObj.save();
    console.log(result);
}


async function getCourses() {
    // const courses = await Course.find();   // returns all courses
    const courses = await Course
            .find({ author: 'Mosh', isPublished: true})
            .limit(10)
            .sort({ name: 1}) // 1 is ASC , -1 is DESC
            .select({ name: 1 , tags: 1});


            // .find({ price: { $gt: 10 , $lte: 20} })  //   10 < price <=20
            // .find({ price: { $in: [15,20,25] } })    //   price in [15,20,25]
            // .find().or([{author: 'Mosh'}, {isPublished: true}])   // authored by Mosh or published=true
            // .find().and([{}, {}])
            // .find({ author: /^Mosh/ }) // starts with Mosh    --> case sensitive
            // .find({ author: /^Mosh/i }) // starts with Mosh    --> case insensitive
            // .find({ author: /Hamedani$/ }) // ends with Hamedani
            // .find({ author: /.*Mosh.*/ }) // contains Mosh
            // .find().count()
            // .find().skip((pageNumber-1)*paeSize).limit(pageSize)   --> for pagination


           
    console.log(courses);
}


// createCourse();
getCourses();


