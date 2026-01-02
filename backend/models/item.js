// import mongoose
const mongoose = require("mongoose");

// define the schema
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    company: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

// export the model
module.exports = mongoose.model('Item', itemSchema);