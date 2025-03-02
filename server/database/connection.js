const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // mongoDB connection string
        const con = await mongoose.connect(process.env.MONGODB_URI)

        console.log(`MongoDB is connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB