var mongoose = require("mongoose");

var facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  gender: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },

  deptName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

var Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;
