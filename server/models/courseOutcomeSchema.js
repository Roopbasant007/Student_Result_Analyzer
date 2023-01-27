const mongoose = require("mongoose");

var courseOutcomeSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
  },
  COs: [
    {
      COslNo: {
        type: String,
        default: "",
      },
      courseOutcome: {
        type: String,
        default: "",
      },
      test1: {
        type: Number,
        default: 0,
      },
      midSem: {
        type: Number,
        default: 0,
      },
      test2: {
        type: Number,
        default: 0,
      },
      endSem: {
        type: Number,
        default: 0,
      },
    },
  ],
});

var CourseOutcome = mongoose.model("CourseOutcome", courseOutcomeSchema);

module.exports = CourseOutcome;
