const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/notesoncloud?appname=MongoDB+Compass&readPreference=primary&tls=false&directConnection=true";

const connectToMOngoDb = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to DB successfully");
    })
}
 module.exports = connectToMOngoDb; 























