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
    const { progName, duration, dept } = req.body;
    if (!dept || !progName || !duration)
      return res
        .status(401)
        .json({ message: "Bad Request, Please up the form properly" });

    const deptId = await Department.findOne({ deptCode: dept });

    const program = new Program({
      progName,
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
async function addCourse(req, res) {
  try {
    const {
      courseCode,
      courseName,
      courseType,
      credit,
      semester,
      faculty_id,
      program_id,
    } = req.body;

    if (
      !courseCode ||
      !courseName ||
      !courseType ||
      !credit ||
      !semester ||
      !faculty_id ||
      !program_id
    )
      return res
        .status(401)
        .json({ message: "Bad Request, Please fill up the form properly" });

    const programId = await Program.findOne({ _id: program_id });

    const facultyId = await Faculty.findOne({ _id: faculty_id });

    const course = new Course({
      courseCode,
      courseName,
      courseType,
      credit,
      semester,
      teachingFaculty: facultyId,
      belongingProgram: programId,
    });

    await course.save();

    return res.status(201).json({ message: "Course Added Successfully" });
  } catch (error) {
    return res.status(501).json({ message: "Internal Server Error" });
  }
}

module.exports = { addDepartment, addProgram, addCourse };
