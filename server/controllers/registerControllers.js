const Student = require("../models/studentSchema");
const Faculty = require("../models/facultySchema");
const Admin = require("../models/adminSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register Student

async function registerStudent(req, res) {
  try {
    const {
      name,
      rollNo,
      sem,
      yoa,
      deptName,
      gender,
      email,
      password,
      enrolledProgram,
    } = req.body;

    console.log(
      name,
      rollNo,
      sem,
      yoa,
      deptName,
      gender,
      email,
      password,
      enrolledProgram
    );

    if (!name || !email || !password) {
      return res.status(400).json({ message: " Bad Request" });
    }

    // Check if student already exists
    const checkStudent = await Student.findOne({ email: email });
    if (checkStudent) {
      return res.status(400).json({ message: "Student already exist " });
    }

    const newStudent = new Student({
      name,
      rollNo,
      sem,
      yoa,
      deptName,
      gender,
      email,
      password: bcrypt.hashSync(password, 10),
      enrolledProgram,
    });
    console.log("hello");
    await newStudent.save();

    // return the created data with token
    return res.status(201).json({
      student: {
        id: newStudent.id,
        email: newStudent.email,
        name: newStudent.name,
      },
      message: "Registration Successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Interval Server Error" });
  }
}

// Register faculty

async function registerFaculty(req, res) {
  try {
    const { name, gender, phoneNo, deptName, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: " Bad Request" });
    }

    // Check if student already exists
    const checkFaculty = await Faculty.findOne({ email: email });
    if (checkFaculty) {
      return res.status(400).json({ message: "faculty already exist " });
    }

    const newFaculty = new Faculty({
      name,
      phoneNo,
      gender,
      deptName,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    await newFaculty.save();

    // return the created data with token
    return res.status(201).json({
      faculty: {
        id: newFaculty.id,
        email: newFaculty.email,
        name: newFaculty.name,
      },
      message: "Registration Successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Interval Server Error" });
  }
}

// register admin

async function registerAdmin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: " Bad Request, email or password doesnot exist" });
    }

    // Check if student already exists
    const checkAdmin = await Admin.findOne({ email: email });
    if (checkAdmin) {
      return res.status(400).json({ message: "Admin already exist " });
    }

    const newAdmin = new Admin({
      email,
      password: bcrypt.hashSync(password, 10),
    });

    await newAdmin.save();

    res.status(201).json({ message: " Admin Registration Successful " });

    // Sign a JWT access token and return with response

    // const payload = {
    //   id: newStudent.id,
    //   role: "student",
    // };

    // const token = jwt.sign(payload, process.env.JSON_TOKEN_SECRET);

    // // return the created data with token
    // return res.status(200).json({
    //   student: {
    //     id: newStudent.id,
    //     email: newStudent.email,
    //     name: newStudent.name,
    //   },
    //   accessToken: token,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Interval Server Error" });
  }
}
module.exports = { registerStudent, registerFaculty, registerAdmin };
