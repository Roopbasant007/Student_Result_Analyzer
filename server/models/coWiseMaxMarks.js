const mongoose = require("mongoose");

var maxMarksCOSchema = new mongoose.Schema({
  dept: {
    type: String,
    required: true,
  },
  sem: {
    type: Number,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
  },
  session: {
    type: Number,
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
});
var COMaxMarks = mongoose.model("COMaxMark", maxMarksCOSchema);
module.exports = COMaxMarks;
