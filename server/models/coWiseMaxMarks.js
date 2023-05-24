const mongoose = require("mongoose");

var maxMarksCOSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  eType: {
    type: String,
    required: true,
  },
  CO1Max: {
    type: Number,
    default: 0,
  },
  CO2Max: {
    type: Number,
    default: 0,
  },
  CO3Max: {
    type: Number,
    default: 0,
  },
  CO4Max: {
    type: Number,
    default: 0,
  },
  CO5Max: {
    type: Number,
    default: 0,
  },
  CO6Max: {
    type: Number,
    default: 0,
  },
  maxMarks: {
    type: Number,
    default: 0,
  },
});
var COMaxMarks = mongoose.model("COMaxMark", maxMarksCOSchema);
module.exports = COMaxMarks;
