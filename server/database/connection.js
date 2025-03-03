const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Correct connection string with quotes
        const con = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB is connected: ${con.connection.host}`);
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
