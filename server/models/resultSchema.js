var mongoose = require("mongoose");

var resultSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
  },
  semesterNo: {
    type: Number,
    required: true,
  },
  grades: [
    {
      courseCode: {
        type: String,
        required: true,
      },
      test1: {
        grade: {
          type: String,
          default: " ",
        },
        comment: {
          type: String,
          default: " ",
        },
      },
      MidSem: [
        {
          grade: {
            type: String,
            default: " ",
          },
          comment: {
            type: String,
            default: " ",
          },
        },
      ],
      test2: [
        {
          grade: {
            type: String,
            default: " ",
          },
          comment: {
            type: String,
            default: " ",
          },
        },
      ],
      EndSem: [
        {
          grade: {
            type: String,
            default: " ",
          },
          comment: {
            type: String,
            default: " ",
          },
        },
      ],
    },
  ],
  sgpa: {
    type: Number,
    default: 0,
  },
  comments: {
    type: String,
    default: " ",
  },
});

var Result = mongoose.model("Result", resultSchema);

module.exports = Result;
