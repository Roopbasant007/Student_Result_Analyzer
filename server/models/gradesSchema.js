var mongoose = require("mongoose");

var gradesSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
  },
  session: {
    type: Number,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
  },
  gradeObt: {
    type: String,
    required: true,
  },
});

var Grades = mongoose.model("Grade", gradesSchema);
module.exports = Grades;
