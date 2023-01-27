var mongoose = require("mongoose");

var programSchema = new mongoose.Schema({
  progName: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
  },
  belongToDept: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
});

var Program = mongoose.model("Program", programSchema);

module.exports = Program;
