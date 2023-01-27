var mongoose = require("mongoose");

var deptSchema = new mongoose.Schema({
  deptName: {
    type: String,
    required: true,
  },
  deptCode: {
    type: String,
    required: true,
  },
});

var Department = mongoose.model("Department", deptSchema);
module.exports = Department;
