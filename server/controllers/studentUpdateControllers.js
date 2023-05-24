const Course = require("../models/courseSchema");
const EnrolledCourse = require("../models/courseEnrollementSchema");
const Student = require("../models/studentSchema");
const Marks = require("../models/marks");

async function updateEnrolledCourses(req, res) {
  try {
    const studentId = req.id;
    const { coursesEnrolled, session, sem, period } = req.body;

    console.log(coursesEnrolled, session, sem, period, studentId);

    if (!coursesEnrolled || !session || !sem || !period)
      return res.status(400).json({
        message: "Either coursesEnrolled, session, sem or period is missing",
      });

    const cId = await Course.find({
      session: session,
      semester: sem,
      period: period,
      courseCode: { $in: coursesEnrolled },
    }).select("_id ");

    console.log(cId);

    if (cId.includes(null))
      return res
        .status(404)
        .json({ message: "One of the courses wasn't found" });

    // find out the student and their current academic courses and update the enrolled courses field
    const curAcademic = await Student.findOne({ _id: studentId }).select(
      "curAcademic -_id"
    );
    console.log("curAcademic" + curAcademic);

    const updatedEnrolledCourses = await EnrolledCourse.findOneAndUpdate(
      { _id: curAcademic.curAcademic },
      {
        $set: {
          student: studentId,
          coursesEnrolled: cId,
          session: session,
          sem: sem,
          period: period,
        },
      }
    );

    if (!updatedEnrolledCourses)
      return res
        .status(404)
        .json({ message: "Enrolled Courses update is not possible" });

    return res.status(200).json({
      message: "Updated Enrolled Courses",
      updatedCourses: coursesEnrolled,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { updateEnrolledCourses };
