const mongoose = require("mongoose");

var courseOutcomeSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
  },
  session: {
    type: Number,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
  CO1: {
    type: Number,
    default: 0,
  },
  CO2: {
    type: Number,
    default: 0,
  },
  CO3: {
    type: Number,
    default: 0,
  },
  CO4: {
    type: Number,
    default: 0,
  },
  CO5: {
    type: Number,
    default: 0,
  },
  CO6: {
    type: Number,
    default: 0,
  },
  PO: {
    type: Number,
    default: 0,
  },
});

var CourseOutcome = mongoose.model("CourseOutcome", courseOutcomeSchema);

module.exports = CourseOutcome;
