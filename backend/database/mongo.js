// environment variables set up
const mongodb_uri = process.env.MONGODB_URI;

// import mongoose
const mongoose = require("mongoose");

// connector function for mongoDB
const connect_database = async () => {
    try {
        const connection = await mongoose.connect(mongodb_uri);

        if (connection) {
            return {
                message : "connection successful",
                exit_code : 0,
            };
        }
        else {
            return {
                message : "connection to mongoDB was interrupted",
                exit_code : -1,
            };
        }
    } catch (error) {
        console.error('mongo db connection could not be established', error.message);
        process.exit(1);
    }
}

// export connection service
module.exports = connect_database;