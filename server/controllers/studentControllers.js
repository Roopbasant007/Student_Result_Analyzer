const Course = require("../models/courseSchema");
const EnrolledCourse = require("../models/courseEnrollementSchema");
const Student = require("../models/studentSchema");

// course enrollement by student

async function courseEnrollement(req, res) {
  try {
    const id = req.id;
    console.log(id);
    const { coursesEnrolled, session, sem, period } = req.body;

    console.log(coursesEnrolled, session, sem, period);

    if (!coursesEnrolled || !session || !sem || !period)
      return res.status(400).json({
        message: "Either courseEnrolled, session, sem or period is missing",
      });

    // check that student has alrady registered for the courses or not, he/she is trying to register

    const checkIfAlreadyEnrolled = await EnrolledCourse.find({
      student: req.id,
      session: session,
      sem: sem,
      courseCode: { $in: coursesEnrolled },
    }).select("_id");

    console.log(checkIfAlreadyEnrolled.length);

    if (checkIfAlreadyEnrolled.length)
      return res
        .status(403)
        .json({ message: "Student has already completed course enrollment" });

    // loop through the array of cCode i.e courseEnrolled and from their generate the course object ids for each

    const cId = await Course.find({
      semester: sem,
      session: session,
      courseCode: { $in: coursesEnrolled },
    }).select("_id");

    console.log(cId);

    // since now we have got this course id now we can create this course enrollment
    if (!cId.length) return res.status(400).json({ message: "Bad Request" });

    const newEnrollment = new EnrolledCourse({
      student: id,
      coursesEnrolled: cId,
      session: session,
      sem: sem,
      period: period,
    });

    // updates the current academics of the registered student
    console.log(newEnrollment._id);
    await Student.findByIdAndUpdate(
      { _id: id },
      { curAcademic: newEnrollment._id }
    );

    await newEnrollment.save();

    return res.status(201).json({ message: "Course Enrolled Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// get all enrolled courses for a particular semester for a particular sem

async function getCurSemEnrolledCourses(req, res) {
  try {
    const courses = await Student.find({ _id: req.id })
      .populate({
        path: "curAcademic",
        populate: {
          path: "coursesEnrolled",
          select: "courseName _id",
        },
        select: "coursesEnrolled -_id",
      })
      .select("");

    if (!courses.length)
      return res
        .status(204)
        .json({ message: "No courses enrolled for the current semester" });

    // transformation of data
    const data = courses[0].$getPopulatedDocs()[0].coursesEnrolled;
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// get the enrolled courses of previous semester for a particular student

async function getPrevSemsEnrolledCourses(req, res) {
  try {
    let curSem = await Student.find({ _id: req.id }).select("sem -_id");
    curSem = curSem[0].sem;
    const courses = await EnrolledCourse.find({
      student: req.id,
      sem: { $lt: curSem },
    })
      .populate({
        path: "coursesEnrolled",
        select: "_id courseName",
      })
      .select("sem -_id");

    // if student has not enrolled for any course yet
    if (!courses.length)
      return res
        .status(204)
        .json({ meessage: "You have not enrolled for any course" });

    console.log(courses[0].sem);
    return res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// get the data for a particular student of a particular course

async function getCourseDetail(req, res) {
  try {
    const id = req.params.id;
    const courseInfo = await Course.findById(id)
      .select("-_id -__v -session -CoPoMap")
      .populate({
        path: "teachingFaculty",
        select: "name -_id",
      })
      .populate({
        path: "belongingProgram",
        select: "progName -_id",
      })
      .populate({
        path: "belongingDepartment",
        select: "deptName -_id",
      });

    console.log(courseInfo);

    if (!courseInfo)
      return res
        .status(204)
        .json({ message: "Course details are not available" });

    return res.status(200).json(courseInfo);
  } catch (error) {
    console.log(error);
  }
}

// get the progress of the student in a particular course

async function getProgressAndResult(req, res) {}

module.exports = {
  courseEnrollement,
  getCurSemEnrolledCourses,
  getPrevSemsEnrolledCourses,
  getCourseDetail,
};
