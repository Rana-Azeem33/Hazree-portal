//make connection with db
//Hazree db

const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/Hazree"

mongoose.connect(url,
    { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("connected to database...");

    }).catch(err => console.log(err));