var mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
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
  yoa: {
    type: Number,
    required: true,
  },
  deptName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  curAcademic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EnrolledCourse",
    default: null,
  },
  enrolledProgram: {
    type: String,
    required: true,
  },
});

var Student = mongoose.model("Student", studentSchema);

module.exports = Student;
