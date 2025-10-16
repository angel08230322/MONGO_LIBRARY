// This file is responsible for establishing the connection to your database.
const mongoose = require('mongoose');

/**
 * Connects to the database using the URI from environment variables.
 */
const connectDB = async () => {
    try {
        // We are removing 'useNewUrlParser' and 'useUnifiedTopology'
        // as they are deprecated and have no effect in recent Mongoose versions.
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to database: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
