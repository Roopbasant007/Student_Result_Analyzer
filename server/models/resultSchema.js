var mongoose = require("mongoose");

var resultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  session: {
    type: Number,
    required: true,
  },
  progName: {
    type: String,
    required: true,
  },
  deptName: {
    type: String,
    required: true,
  },
  courses: [
    {
      courseCode: {
        type: String,
      },
      courseTitle: {
        type: String,
      },
      credit: {
        type: String,
      },
      gradeObt: {
        type: String,
      },
    },
  ],
  totalCourses: {
    type: Number,
    default: 0,
  },
  totalCreditCounted: {
    type: Number,
    default: 0,
  },
  totalGradePointEarned: {
    type: Number,
    default: 0,
  },
  sgpa: {
    type: Number,
    default: 0,
  },
  cgpa: {
    type: Number,
    default: 0,
  },
});

var Result = mongoose.model("Result", resultSchema);

module.exports = Result;
