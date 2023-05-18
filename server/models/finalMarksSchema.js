const mongoose = require("mongoose");

var finalMarksSchema = new mongoose.Schema({
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
  rollNo: {
    type: String,
    required: true,
  },

  CO1Total: {
    type: Number,
    default: 0,
  },
  CO2Total: {
    type: Number,
    default: 0,
  },
  CO3Total: {
    type: Number,
    default: 0,
  },
  CO4Total: {
    type: Number,
    default: 0,
  },
  CO5Total: {
    type: Number,
    default: 0,
  },
  CO6Total: {
    type: Number,
    default: 0,
  },
  grandTotal: {
    type: String,
    default: 0,
  },
});

const FinalMarksInPercentage = mongoose.model("FinalMark", finalMarksSchema);
module.exports = FinalMarksInPercentage;
