var mongoose = require("mongoose");

var courseEnrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },

  coursesEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: [],
    },
  ],

  session: {
    type: Number,
    required: true,
  },

  sem: {
    type: Number,
    required: true,
  },

  period: {
    type: String,
    required: true,
    enum: ["Spring", "Autumn"],
  },
});

var EnrolledCourse = mongoose.model("EnrolledCourse", courseEnrollmentSchema);

module.exports = EnrolledCourse;
