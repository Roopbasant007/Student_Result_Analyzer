const express = require("express");
const uploadMarks = require("../middlewares/fileUpload");
const verifyCookies = require("../middlewares/verifyCookies");
const { verifyIfFaculty } = require("../middlewares/verifyRole");

//  faculty dashboard data access
const {
  getCurSessionCourses,
  getAllSessionCourses,
  getPerformances,
} = require("../controllers/facultyDashboardControllers");

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

facultyRouter.get(
  "/curSessionCourses",
  verifyCookies,
  verifyIfFaculty,
  getCurSessionCourses
);

facultyRouter.get(
  "/prevSessionCourses",
  verifyCookies,
  verifyIfFaculty,
  getAllSessionCourses
);

facultyRouter.post(
  "/addCourseAndOutcome",
  verifyCookies,
  verifyIfFaculty,
  addCourseAndOutcome
);

facultyRouter.post(
  "/uploadMarks/:id",
  verifyCookies,
  verifyIfFaculty,
  uploadMarks,
  studentMarks
);

facultyRouter.post(
  "/generateCourseAndProgramOutcome/:id",
  verifyCookies,
  verifyIfFaculty,
  generateFinalCourseAndProgramOutcome
);
facultyRouter.get(
  "/CourseAndProgramOutcome/:id",
  verifyCookies,
  verifyIfFaculty,
  getCOPO
);
facultyRouter.get("/studentResult", generateStudentsResult);
facultyRouter.get("/tempResult", getTempResult);

facultyRouter.post(
  "/generateGrades/:courseId",
  verifyCookies,
  verifyIfFaculty,
  generateGrades
);

facultyRouter.get(
  "/studentsPerformances/:courseId/:eType",
  verifyCookies,
  verifyIfFaculty,
  getPerformances
);

module.exports = facultyRouter;
