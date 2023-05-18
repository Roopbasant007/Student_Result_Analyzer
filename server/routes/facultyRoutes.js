const express = require("express");
const uploadMarks = require("../middlewares/fileUpload");
const verifyCookies = require("../middlewares/verifyCookies");
const { verifyIfFaculty } = require("../middlewares/verifyRole");

const {
  addCourseAndOutcome,
  studentMarks,
  generateFinalCourseAndProgramOutcome,
  getCOPO,
  generateStudentsResult,
  getTempResult,
  generateGrades,
} = require("../controllers/facultyControllers");

const facultyRouter = express.Router();

facultyRouter.post(
  "/addCourseAndOutcome",
  verifyCookies,
  verifyIfFaculty,
  addCourseAndOutcome
);
facultyRouter.post("/uploadMarks", uploadMarks, studentMarks);
facultyRouter.post(
  "/generateCourseOutcome",
  generateFinalCourseAndProgramOutcome
);
facultyRouter.get("/CourseAndProgramOutcome", getCOPO);
facultyRouter.get("/studentResult", generateStudentsResult);
facultyRouter.get("/tempResult", getTempResult);
facultyRouter.post("/generateGrades", generateGrades);

module.exports = facultyRouter;
