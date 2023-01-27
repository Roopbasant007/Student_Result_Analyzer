const express = require("express");

const {
  addCourseOutcome,
  addMarks,
} = require("../controllers/facultyControllers");

const facultyRouter = express.Router();

facultyRouter.post("/addCourseOutcome", addCourseOutcome);
facultyRouter.post("/addMarks", addMarks);

module.exports = facultyRouter;
