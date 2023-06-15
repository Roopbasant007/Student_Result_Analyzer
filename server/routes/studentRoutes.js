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
  getAllSemResult,
  getRunningTranscript,
  getStudentProfile,
} = require("../controllers/studentControllers");

// student update routes

const {
  updateEnrolledCourses,
  updateProfile,
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

studentRouter.get(
  "/result/allSemResult",
  verifyCookies,
  verifyIfStudent,
  getAllSemResult
);

studentRouter.get(
  "/result/runningTranscript",
  verifyCookies,
  verifyIfStudent,
  getRunningTranscript
);

studentRouter.put(
  "/updateProfile",
  verifyCookies,
  verifyIfStudent,
  updateProfile
);
studentRouter.get(
  "/studentProfile",
  verifyCookies,
  verifyIfStudent,
  getStudentProfile
);

module.exports = studentRouter;
