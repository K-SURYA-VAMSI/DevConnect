const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://surya:surya1511@cluster1.a9labds.mongodb.net/devTinder");
};


module.exports = connectDB;