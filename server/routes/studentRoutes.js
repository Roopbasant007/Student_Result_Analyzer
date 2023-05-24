const express = require("express");
const verifyCookies = require("../middlewares/verifyCookies");
const { verifyIfStudent } = require("../middlewares/verifyRole");

const {
  courseEnrollement,
  getCurSemEnrolledCourses,
  getPrevSemsEnrolledCourses,
  getCourseDetail,
  getProgress,
  getCurSemResult,
} = require("../controllers/studentControllers");

// student update routes

const {
  updateEnrolledCourses,
} = require("../controllers/studentUpdateControllers");

const studentRouter = express.Router();

studentRouter.post(
  "/courseEnrollment",
  verifyCookies,
  verifyIfStudent,
  courseEnrollement
);

studentRouter.post(
  "/updateCourseEnrollment",
  verifyCookies,
  verifyIfStudent,
  updateEnrolledCourses
);

studentRouter.get(
  "/curSemEnrolledCourses",
  verifyCookies,
  verifyIfStudent,
  getCurSemEnrolledCourses
);

studentRouter.get(
  "/prevSemsEnrolledCourses",
  verifyCookies,
  verifyIfStudent,
  getPrevSemsEnrolledCourses
);

studentRouter.get(
  "/courseDetails/:id",
  verifyCookies,
  verifyIfStudent,
  getCourseDetail
);

studentRouter.get(
  "/curSemEnrolledCourses/:courseId/progress",
  verifyCookies,
  verifyIfStudent,
  getProgress
);

studentRouter.get(
  "/result/curSemResult",
  verifyCookies,
  verifyIfStudent,
  getCurSemResult
);

module.exports = studentRouter;
