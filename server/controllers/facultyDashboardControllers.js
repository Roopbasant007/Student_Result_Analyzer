const Course = require("../models/courseSchema");
const Faculty = require("../models/facultySchema");
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

    console.log("course:" + courseId, eType);

    // get the marks of student and count the of categories students in which students have been categorized

    const studentMarks = await Marks.find({ courseId: courseId, eType: eType })
      .select("rollno total category -_id")
      .sort({ rollno: 1 });

    // count will store the frequency of each categories of students
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

    function avaragePerformances(student) {
      if (student.category == "Average" || student.category == "Below Average")
        return student;
    }

    function goodPerformances(student) {
      if (
        student.category == "Excellent" ||
        student.category == "Very Good" ||
        student.category == "Good"
      )
        return student;
    }

    const goodPerformingStudents = studentMarks.filter(goodPerformances);

    const averagePerformingStudents = studentMarks.filter(avaragePerformances);

    const badPerformingStudents = studentMarks.filter(badPerformances);

    // badPerformingStudents.forEach((student) => {
    //   console.log(student);
    // });
    console.log(goodPerformingStudents);
    console.log(averagePerformingStudents);
    console.log(badPerformingStudents);

    return res.status(200).json({
      goodPerformingStudents: goodPerformingStudents,
      averagePerformingStudents: averagePerformingStudents,
      badPerformingStudents: badPerformingStudents,
    });
    //
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// how to check that marks of which sessional for a particular subject has already been uploaded or not
async function getAlreadyUploadedMarksInfo(req, res) {
  try {
    const courseId = req.params.courseId;
    console.log(courseId);

    //  search based on the courseId and select etype to get the idea that for what exams marks has already been uploaded
    const uploadedMarks = await Marks.find({ courseId: courseId })
      .select("eType -_id")
      .distinct("eType");
    console.log(uploadedMarks);
    var eType = ["Test1", "Test2", "MidTerm", "EndTerm"];

    if (uploadedMarks.includes("Test1")) {
      let index = eType.indexOf("Test1");
      if (index > -1) {
        eType.splice(index, 1);
      }
    }
    if (uploadedMarks.includes("Test2")) {
      let index = eType.indexOf("Test2");
      if (index > -1) {
        eType.splice(index, 1);
      }
    }
    if (uploadedMarks.includes("MidTerm")) {
      let index = eType.indexOf("MidTerm");
      if (index > -1) {
        eType.splice(index, 1);
      }
    }
    if (uploadedMarks.includes("EndTerm")) {
      let index = eType.indexOf("EndTerm");
      if (index > -1) {
        eType.splice(index, 1);
      }
    }

    console.log(eType);

    return res.status(200).json(eType);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// faculty profile update
async function updateProfile(req, res) {
  try {
    const id = req.id;

    const { name, gender, phoneNo, deptName, email } = req.body;

    if (!name || !gender || !phoneNo || !deptName || !email) {
      return res.status(400).json({ message: " Bad Request" });
    }

    // Check if student already exists
    await Faculty.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          phoneNo: phoneNo,
          gender: gender,
          deptName: deptName,
          email: email,
        },
      }
    );
    return res.status(200).json({ message: "Your profile has been updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// get faculty profile
async function getFacultyProfile(req, res) {
  try {
    const id = req.id;
    console.log(id);
    const profile = await Faculty.findOne({ _id: id }).select(
      "-_id -__v -password"
    );
    console.log(profile);
    if (profile) return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getCurSessionCourses,
  getAllSessionCourses,
  getPerformances,
  getAlreadyUploadedMarksInfo,
  updateProfile,
  getFacultyProfile,
};
