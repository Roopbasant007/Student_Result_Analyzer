const Program = require("../models/programSchema");
const Department = require("../models/departmentSchema");

// get all the Programs available

async function getAllPrograms(req, res) {
  try {
    const programs = await Program.find().select("-_id -__v").populate({
      path: "belongToDept",
      select: "deptName -_id",
    });
    return res.status(200).json(programs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// get all the departments available

module.exports = { getAllPrograms };
