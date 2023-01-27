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
  gender: {
    type: String,
    required: true,
  },
  deptName: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
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
  enrolledProgram: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Program",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

var Student = mongoose.model("Student", studentSchema);

module.exports = Student;
