const mongoose = require("mongoose");

module.exports = async () => {
  try {
    mongoose.connect(process.env.DB_URI);
    console.log("Database Connected Succeefully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
