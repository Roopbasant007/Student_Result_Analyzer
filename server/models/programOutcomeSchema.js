const mongoose = require("mongoose");

var programOutcomeSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  PO1: {
    type: Number,
    default: 0,
  },
  PO2: {
    type: Number,
    default: 0,
  },
  PO3: {
    type: Number,
    default: 0,
  },
  PO4: {
    type: Number,
    default: 0,
  },
  PO5: {
    type: Number,
    default: 0,
  },
  PO6: {
    type: Number,
    default: 0,
  },
  PO7: {
    type: Number,
    default: 0,
  },
  PO8: {
    type: Number,
    default: 0,
  },
  PO9: {
    type: Number,
    default: 0,
  },
  PO10: {
    type: Number,
    default: 0,
  },
  PO11: {
    type: Number,
    default: 0,
  },
  PO12: {
    type: Number,
    default: 0,
  },
  PSO1: {
    type: Number,
    default: 0,
  },
  PSO2: {
    type: Number,
    default: 0,
  },
  PSO3: {
    type: Number,
    default: 0,
  },
  PO: {
    type: Number,
    default: 0,
  },
});

var ProgramOutcome = mongoose.model("ProgramOutcome", programOutcomeSchema);

module.exports = ProgramOutcome;
