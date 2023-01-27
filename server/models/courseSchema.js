var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  courseType: {
    type: String,
    required: true,
  },
  credit: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  semester: {
    type: Number,
    required: true,
  },
  teachingFaculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    default: {},
  },
  belongingProgram: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
  },
});

var Course = mongoose.model("Course", courseSchema);

module.exports = Course;
