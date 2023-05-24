const mongoose = require("mongoose");

var marksSchema = new mongoose.Schema({
  rollno: {
    type: String,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
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
  total: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    default: 0,
  },
});
var Marks = mongoose.model("Mark", marksSchema);
module.exports = Marks;
