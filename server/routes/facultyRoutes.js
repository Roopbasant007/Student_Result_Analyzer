const express = require("express");
const uploadMarks = require("../middlewares/fileUpload");
const verifyCookies = require("../middlewares/verifyCookies");
const { verifyIfFaculty } = require("../middlewares/verifyRole");

//  faculty dashboard data access
const {
  getCurSessionCourses,
  getAllSessionCourses,
  getPerformances,
  getAlreadyUploadedMarksInfo,
  updateProfile,
  getFacultyProfile,
} = require("../controllers/facultyDashboardControllers");

const {
  addCourseAndOutcome,
  studentMarks,
  generateFinalCourseAndProgramOutcome,
  getCOPO,
  generateStudentsResult,
  getTempGrades,
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

// file upload
// facultyRouter.post("/fileUpload", verifyCookies, verifyIfFaculty, uploadMarks);

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
facultyRouter.get("/tempResult/:id", getTempGrades);

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

facultyRouter.get(
  "/:courseId/alredyUploadedMarksEtype",
  verifyCookies,
  verifyIfFaculty,
  getAlreadyUploadedMarksInfo
);

facultyRouter.put(
  "/updateProfile",
  verifyCookies,
  verifyIfFaculty,
  updateProfile
);

facultyRouter.get(
  "/facultyProfile",
  verifyCookies,
  verifyIfFaculty,
  getFacultyProfile
);

module.exports = facultyRouter;
