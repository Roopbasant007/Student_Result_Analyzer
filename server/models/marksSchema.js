var mongoose = require("mongoose");

var marksSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
  },
  semesterNo: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  Marks: [
    {
      rollNo: {
        type: String,
        required: true,
      },
      test1Marks: {
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
      },
      midSemMarks: {
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
      },
      test2Marks: {
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
      },
      endSemMarks: {
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
      },
    },
  ],
});

var StudentMarks = mongoose.model("Mark", marksSchema);

module.exports = StudentMarks;
