const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/BookSpace?directConnection=true"
const dotenv = require('dotenv');
dotenv.config();

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewURLParser: true,
        useUnifiedTopology: true,
    }).then(() => { console.log("Connected Mongo") }).catch((err) => { console.log(err) })
}

module.exports = connectToMongo;
