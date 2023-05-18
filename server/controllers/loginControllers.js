const Student = require("../models/studentSchema");
const Faculty = require("../models/facultySchema");
const Admin = require("../models/adminSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ========================================================== login student ==============================================================
async function loginStudent(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Bad Request, Please Enter your Email or Password " });

    // check if student email exists
    const checkStudent = await Student.findOne({ email: email });

    if (!checkStudent)
      return res.status(404).json({ message: "User doesnot exist" });

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      checkStudent.password
    );
    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid Email or Password" });

    const payload = {
      id: checkStudent.id,
      rollno: checkStudent.rollNo,
      role: "student",
    };

    const token = jwt.sign(payload, process.env.JSON_TOKEN_SECRET);

    // setting the token values in cookies
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 10800000),
    });

    // return the created data with token
    return res.status(200).json({
      student: {
        id: checkStudent.id,
        rollno: checkStudent.rollNo,
        email: checkStudent.email,
        name: checkStudent.name,
      },
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Internal Server Error" });
  }
}

//=================================================== login faculty ====================================================================
async function loginFaculty(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Bad Request, Please Enter your Email or Password " });

    // check if faculty email exists
    const checkFaculty = await Faculty.findOne({ email: email });

    if (!checkFaculty)
      return res.status(404).json({ message: "User doesnot exist" });

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      checkFaculty.password
    );
    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid Password" });

    const payload = {
      id: checkFaculty.id,
      rollno: checkFaculty.id,
      role: "faculty",
    };

    const token = jwt.sign(payload, process.env.JSON_TOKEN_SECRET);

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 86400000),
    });

    // return the created data with token
    return res.status(200).json({
      faculty: {
        id: checkFaculty.id,
        email: checkFaculty.email,
        name: checkFaculty.name,
      },
      accessToken: token,
    });
  } catch (error) {
    return res.status(501).json({ message: "Internal Server Error" });
  }
}

//================================================== login admin ==========================================================================
async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Bad Request, Invalid Email or Password " });

    // check if admin email exists
    const checkAdmin = await Admin.findOne({ email: email });

    if (!checkAdmin) return res.status(404).json({ message: "Invalid Admin" });

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      checkAdmin.password
    );
    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid Email or Password" });

    const payload = {
      id: checkAdmin.id,
      rollNo: checkAdmin.rollNo,
      role: "admin",
    };

    const token = jwt.sign(payload, process.env.JSON_TOKEN_SECRET);

    // creation of cookies for token
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 86400000),
    });

    // return the created data with token
    return res.status(200).json({
      admin: {
        id: checkAdmin.id,
        email: checkAdmin.email,
      },
      accessToken: token,
    });
  } catch (error) {
    return res.status(501).json({ message: "Internal Server Error" });
  }
}

module.exports = { loginStudent, loginFaculty, loginAdmin };
