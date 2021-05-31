const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;