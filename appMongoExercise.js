// run the folowing in the cmd or powershell
// mongoimport --db mongo-exercises --collection courses --drop --file exercise-data.json --jsonArray



const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

mongoose.connect('mongodb://localhost/mongo-exercises', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))



// validation at mongoose level:

const courseSchema = new mongoose.Schema({
    name: {
        _id: String,
        type: String,
        required: true,
        default: 'xxx',
        minlength: 3,
        maxlength: 200,
        // match: /pattern/ 
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        //uppercase:true
        trim:true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'A course should have at least one tag.'
        }
    },
    // tags: { // ---------------------------------------> async validatior example
    //     type: Array,
    //     validate: {
    //         isAsync: true,
    //         validator: function(v, callback) {
    //             setTimeout(() => {
    //                 // Do sime async work
    //                 const result = v && v.length > 0;
    //                 callback(result);
    //             }, 4000);
    //         },
    //         message: 'A course should have at least one tag.'
    //     }
    // },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished; },
        min: 10,
        max: 100,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});



// Course class, to create instances from this later
const Course = mongoose.model('Course', courseSchema);




async function createCourse() {
    const courseObj = new Course({
        name: 'new Node.js',
        author: 'Ali Nadjar',
        tags: ['node', 'backend'],
        isPublished: true,
        category: 'web',
        price: 15
    });

    try {
        //await courseObj.validate();
        //courseObj.validate( err => { if(err) { } });     // no await, because of callback
        const result = await courseObj.save();
        console.log(result);
    } catch (ex) {
        console.log(ex.message);
        for (field in ex.errors) {
            console.log(ex.errors[field]);
            console.log(ex.errors[field].message);
        }

    }
}

// createCourse();





async function getCourses() {
    return await Course
        // .find({ isPublished: true, tags: 'backend' })
        // .find({ isPublished: true, tags: ['backend', 'frontend'] })  // both back and frontend
        // .find({ isPublished: true, tags: { $in: ['backend', 'frontend'] } }) // possible to rwrite using OR:
        .find({ isPublished: true })
        .or([{ tags: 'frontend' }, { tags: 'backend' }])
        .sort({ name: 1 })
        // .sort({ price: -1, name: 1 })
        // .select('name author')
        .select({ name: 1, author: 1 });
}

// async function run() {
//     const courses = await getCourses();
//     console.log(courses);
// }

// run();






// ---------------------------   UPDATE : APPROACH I -------------------------------------------
async function updateCourse(id) {

    // const course = await Course.findById(new ObjectID(id));
    const course = await Course.findById(id);


    console.log(course);
    if (!course) {
        return;
    }

    course.isPublished = true;
    course.author = 'A. Nadjar';

    // course.set({
    //     isPublished: true,
    //     author: 'new author'
    // });

    const result = await course.save();
    console.log(result);
}



//updateCourse('5dbfd84ad4207910bc5d5155');


// ---------------------------   UPDATE : APPROACH II -------------------------------------------


async function updateCourseII(id) {

    // const course = await Course.findById(new ObjectID(id));
    const result = await Course.update({ _id: id }, {
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    });

    console.log(result);


    //if you needed the updated object after update
    const course = await Course.findByIdAndUpdate({ _id: id }, {
        $set: {
            author: 'Mosh Hamedani',
            isPublished: true
        }
    });


    console.log(course);
}

// updateCourseII('5a68fdd7bee8ea64649c2777');



//-------------------------------------  Removing a document -------------------------------------------

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    console.log(result);

    //if you needed the deleted document
    //const course = await Course.findByIdAndRemove({ _id: id });
    //console.log(course);

    const result = await Course.deleteMany({ isPublished: false });
}

//removeCourse('someID here');

