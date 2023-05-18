const express = require("express");
const verifyCookies = require("../middlewares/verifyCookies");
const { verifyIfStudent } = require("../middlewares/verifyRole");

const {
  courseEnrollement,
  getCurSemEnrolledCourses,
  getPrevSemsEnrolledCourses,
  getCourseDetail,
} = require("../controllers/studentControllers");

const studentRouter = express.Router();

studentRouter.post(
  "/courseEnrollment",
  verifyCookies,
  verifyIfStudent,
  courseEnrollement
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

module.exports = studentRouter;
