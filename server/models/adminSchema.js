var mongoose = require("mongoose");

var adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

var DBAdmin = mongoose.model("DBAdmin", adminSchema);

module.exports = DBAdmin;
