var mongoose = require("mongoose");

var gradesSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
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
