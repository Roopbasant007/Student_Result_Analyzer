const mongoose = require("mongoose");

var marksSchema = new mongoose.Schema({
  dept: {
    type: String,
    required: true,
  },
  rollno: {
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
});
var Marks = mongoose.model("Mark", marksSchema);
module.exports = Marks;
