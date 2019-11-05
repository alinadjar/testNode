
const express = require('express');
const app = express();
const port = 2000;


// app.METHOD(PATH, HANDLER)
app.get('/', (req, res) => {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mongo-exercises");
        dbo.collection("courses")
           .find({ _id: '5a68fdd7bee8ea64649c2777' }, { projection: { _id: 0, name: 1, author: 1 } })
           .toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            db.close();
        });
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))