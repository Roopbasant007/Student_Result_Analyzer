var mongoose = require('mongoose')

var finalResultSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    sem1SGPA: {
        type: Number
    },
    sem2SGPA: {
        type: Number
    },
    sem3SGPA: {
        type: Number
    },
    sem4SGPA: {
        type: Number
    },
    sem5SGPA: {
        type: Number
    },
    sem6SGPA: {
        type: Number
    },
    sem7SGPA: {
        type: Number
    },
    sem8SGPA: {
        type: Number
    },
    CGPA: {
        type: Number
    },
    comments: {
        type: String
    }
})

var FinalResult = mongoose.model('FinalResult', finalResultSchema);

module.exports = FinalResult;