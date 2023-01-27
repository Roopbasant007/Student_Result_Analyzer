const express = require("express");

const {
  addDepartment,
  addProgram,
  addCourse,
} = require("../controllers/adminControllers");

const adminRouter = express.Router();

adminRouter.post("/addDepartment", addDepartment);
adminRouter.post("/addProgram", addProgram);
adminRouter.post("/addCourse", addCourse);

module.exports = adminRouter;
