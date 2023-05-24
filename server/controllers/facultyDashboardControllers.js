const Course = require("../models/courseSchema");
const Marks = require("../models/marks");

async function getCurSessionCourses(req, res) {
  try {
    const d = new Date();
    const year = d.getFullYear();
    console.log(year);
    const month = d.getMonth() + 1;
    console.log(month);

    let curPeriod = "";
    if (month >= 2 && month <= 7) curPeriod = "Spring";
    else curPeriod = "Autumn";

    console.log(curPeriod);
    // let find out courses are being taught by logged in faculty in cur session
    const courses = await Course.find({
      teachingFaculty: req.id,
      session: year,
      period: curPeriod,
    }).select("_id courseName");

    res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getAllSessionCourses(req, res) {
  try {
    const d = new Date();
    const year = d.getFullYear();
    console.log(year);
    const month = d.getMonth() + 1;
    console.log(month);

    let curPeriod = "";
    if (month >= 2 && month <= 7) curPeriod = "Spring";
    else curPeriod = "Autumn";

    console.log(req.id);

    const courses = await Course.find({
      teachingFaculty: req.id,
      $and: [{ session: { $lt: year }, session: { $gte: year - 4 } }],
    }).select("_id courseName");

    return res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// get performance of student in form of categorization of student and Student details those who have been categorized as Poor, Pass, and Fail.

async function getPerformances(req, res) {
  try {
    const courseId = req.params.courseId;
    const eType = req.params.eType;
    const et = "Test1";
    console.log(courseId, eType);
    console.log(eType == et);

    // get the marks of student and count the frequency of categories students in which students have been categorized

    const studentMarks = await Marks.find({ courseId: courseId, eType: eType })
      .select("rollno category -_id")
      .sort({ rollno: 1 });

    // count will store the frequency of each cstegorizes
    let count = [0, 0, 0, 0, 0, 0, 0, 0];
    studentMarks.forEach((marks) => {
      switch (marks.category) {
        case "Excellent":
          count[0]++;
          break;
        case "Very Good":
          count[1]++;
          break;
        case "Good":
          count[2]++;
          break;
        case "Average":
          count[3]++;
          break;
        case "Below Average":
          count[4]++;
          break;
        case "Poor":
          count[5]++;
          break;
        case "Pass":
          count[6]++;
          break;
        case "Fail":
          count[7]++;
          break;
      }
    });

    console.log(count);

    // filter the students those who have been categorized as Poor or Pass or Fail.

    // filter function
    function badPerformances(student) {
      if (
        student.category == "Poor" ||
        student.category == "Pass" ||
        student.category == "Fail"
      )
        return student;
    }

    const badPerformingStudents = studentMarks.filter(badPerformances);

    // badPerformingStudents.forEach((student) => {
    //   console.log(student);
    // });
    console.log(badPerformingStudents);

    return res.status(200).json({ message: "Okay" });
    //
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getCurSessionCourses,
  getAllSessionCourses,
  getPerformances,
};
