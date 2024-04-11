const mongoose = require("mongoose");

//const URI = "mongodb://127.0.0.1:27017/mern_admin";
const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connection to DB was succesful");
    } catch (error) {
        console.log("conn succesful");
        process.exit(0);
    }
}

module.exports = connectDB;