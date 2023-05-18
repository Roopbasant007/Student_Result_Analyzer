const Student = require("../models/studentSchema");
const Faculty = require("../models/facultySchema");
const Course = require("../models/courseSchema");
const Program = require("../models/programSchema");
const Department = require("../models/departmentSchema");

// Add Course

async function addDepartment(req, res) {
  try {
    const { deptName, deptCode } = req.body;
    if (!deptName || !deptCode)
      return res.status(404).json({ message: "Bad Request" });

    const checkIfDeptExist = await Department.findOne({ deptCode: deptCode });
    if (checkIfDeptExist)
      return res.status(400).json({ message: "Dept already added" });

    const department = new Department({ deptName, deptCode });
    await department.save();
    return res.status(201).json({ message: "Department added successfully" });
  } catch (error) {
    return res.status(501).json({ message: "Internal Server Error" });
  }
}

// Add Program

async function addProgram(req, res) {
  try {
    const { progName, progCode, duration, dept } = req.body;
    if (!dept || !progName || !progCode || !duration)
      return res
        .status(401)
        .json({ message: "Bad Request, Please fill up the form properly" });

    const deptId = await Department.findOne({ deptCode: dept });
    const progExist = await Program.findOne({ belongToDept: deptId._id });
    if (progExist)
      return res
        .status(400)
        .json({ message: "Program already exist for this dept" });
    console.log(deptId);

    const program = new Program({
      progName,
      progCode,
      duration,
      belongToDept: deptId._id,
    });

    await program.save();
    return res.status(201).json({ message: "Program Added Successfully" });
  } catch (error) {
    return res.status(501).json({ message: "Internal Server Error" });
  }
}

// Add Course

module.exports = { addDepartment, addProgram };
