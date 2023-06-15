const Course = require("../models/courseSchema");
const EnrolledCourse = require("../models/courseEnrollementSchema");
const Student = require("../models/studentSchema");
const Marks = require("../models/marks");
const COMaxMarks = require("../models/coWiseMaxMarks");
const Grades = require("../models/gradesSchema");
const Result = require("../models/resultSchema");

// course enrollement by student

async function courseEnrollement(req, res) {
  try {
    const id = req.id;

    console.log(id);
    console.log(req.rollno);
    const { coursesEnrolled, session, sem, period } = req.body;

    console.log(coursesEnrolled, session, sem, period);

    if (!coursesEnrolled || !session || !sem || !period)
      return res.status(400).json({
        message: "Either coursesEnrolled, session, sem or period is missing",
      });

    const cId = await Course.find({
      session: session,
      semester: sem,
      courseCode: { $in: coursesEnrolled },
    }).select("_id");
    // const cId = await Promise.all(
    //   coursesEnrolled.map((code) =>
    //     Course.findOne({ session: session, semester: sem, courseCode: code })
    //   )
    // );
    console.log("cid:" + cId);
    // check that student has alrady registered for the courses or not, he/she is trying to register
    if (cId.includes(null))
      return res
        .status(404)
        .json({ message: "One of the courses wasn't found" });
    const checkIfAlreadyEnrolled = await EnrolledCourse.find({
      student: req.id,
      session: session,
      sem: sem,
      period: period,
      coursesEnrolled: { $in: cId },
    }).select("_id");

    console.log(checkIfAlreadyEnrolled.length);

    if (checkIfAlreadyEnrolled.length)
      return res
        .status(403)
        .json({ message: "Student has already completed course enrollment" });

    // loop through the array of cCode i.e courseEnrolled and from their generate the course object ids for each
    if (!cId.length) return res.status(400).json({ message: "Bad Request" });

    // since now we have got this course id now we can create this course enrollment

    const newEnrollment = new EnrolledCourse({
      student: id,
      coursesEnrolled: cId,
      session: session,
      sem: sem,
      period: period,
    });
    await newEnrollment.save();
    // updates the current academics of the registered student
    console.log(newEnrollment._id);
    const updatedcourse = await Student.findOneAndUpdate(
      { _id: id },
      { curAcademic: newEnrollment._id },
      { new: true }
    );
    console.log(updatedcourse);

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

    // console.log(courses[0]);

    if (!courses.length)
      return res
        .status(204)
        .json({ message: "No courses enrolled for the current semester" });

    // transformation of data
    const data = courses[0].$getPopulatedDocs()[0].coursesEnrolled;
    console.log(data);

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// get the enrolled courses of previous semester for a particular student

async function getPrevSemsEnrolledCourses(req, res) {
  try {
    const curSem = await Student.findOne({ _id: req.id }).select("sem -_id");
    console.log(curSem.sem);

    const courses = await EnrolledCourse.find({
      student: req.id,
      sem: { $lte: curSem.sem },
    })
      .populate({
        path: "coursesEnrolled",
        select: "_id courseName semester",
      })
      .select("sem -_id");
    // .sort({ sem: 1 });

    console.log("coursess: " + courses);
    let enCourses = [];

    // if student has not enrolled for any course yet
    if (!courses.length)
      return res
        .status(204)
        .json({ meessage: "You have not enrolled for any course" });
    else {
      for (let i = 0; i < courses.length; i++) {
        courses[i].coursesEnrolled.forEach((course) => {
          enCourses.push(course);
        });
      }
      console.log(enCourses);
      return res.status(200).json(enCourses);
      // courses[1].coursesEnrolled;
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// get the data for a particular student of a particular course

async function getCourseDetail(req, res) {
  try {
    const id = req.params.id;
    console.log(id);
    const courseInfo = await Course.findById(id)
      .select("-_id -__v -session -CoPoMap")
      .populate({
        path: "teachingFaculty",
        select: "name -_id",
      });

    console.log(courseInfo);
    console.log(courseInfo.teachingFaculty.name);

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

async function getProgress(req, res) {
  try {
    // fetch the marks of each student in each exam of a particular course and category in which student has been categorized
    const courseId = req.params.courseId;
    const rollno = req.rollno;

    console.log(courseId, rollno);

    const maxAllowedMarks = await COMaxMarks.find({
      courseId: courseId,
    }).select("eType maxMarks -_id");

    if (!maxAllowedMarks.length)
      return res.status(403).json({
        message:
          "Either faculty has not been uploaded marks or requested resources not available",
      });

    const studentObtainedMarks = await Marks.find({
      courseId: courseId,
      rollno: rollno,
    }).select("eType total category -_id");

    if (!studentObtainedMarks.length)
      return res.status(403).json({
        message:
          "Either faculty have not uploaded the marks for this particular subject or requested resource are not available",
      });

    return res
      .status(200)
      .json({ studentMarks: studentObtainedMarks, maxMarks: maxAllowedMarks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// get cur semester result
async function getCurSemResult(req, res) {
  // find the grade of student in each subject
  const rollno = req.rollno;
  const id = req.id;

  console.log(rollno);
  console.log(id);

  // first and foremeost find the Cur Academic courses that has been enrolled by student and also determine the details of student.
  const curAcadCourses = await Student.find({ _id: id })
    .populate({
      path: "curAcademic",
      select: "coursesEnrolled session period -_id",
    })
    .select("name rollno sem deptName enrolledProgram -_id");

  console.log(curAcadCourses[0].sem);

  if (!curAcadCourses.length)
    return res
      .status(204)
      .json({ message: "No courses enrolled for the current semester" });

  const checkResultExist = await Result.findOne({
    rollNo: rollno,
    sem: curAcadCourses[0].sem,
  });

  if (checkResultExist) return res.status(200).json(checkResultExist);

  // const cId = curAcadCourses[0].$getPopulatedDocs()[0].coursesEnrolled;

  const cId = curAcadCourses[0].curAcademic.coursesEnrolled;

  console.log(cId);

  // now find the grades obtained by the student in each course

  const ObtGrades = await Grades.find({
    rollNo: req.rollno,
    courseId: { $in: cId },
  })
    .select("courseId gradeObt -_id")
    .populate({
      path: "courseId",
      select: "courseCode courseName credit -_id",
    });

  console.log("obtgrades: " + ObtGrades);
  console.log("obtgrades len: " + ObtGrades.length);

  // Check that for all the registered courses grading has been performed or not
  if (ObtGrades.length != cId.length)
    return res.status(200).json({
      message: "Result has not been published yet",
    });

  // transformation of course and grade details and also calculating totalEarnedCredit
  let totalCourses = cId.length;
  let totalCreditCounted = 0;
  let totalGradePointEarned = 0;

  let courseGradeInfo = new Array();
  ObtGrades.forEach((data) => {
    courseGradeInfo.push({
      courseCode: data.courseId.courseCode,
      courseTitle: data.courseId.courseName,
      credit: data.courseId.credit,
      gradeObt: data.gradeObt,
    });

    if (
      data.gradeObt != "W" ||
      data.gradeObt != "F" ||
      data.gradeObt != "I" ||
      data.gradeObt != "X"
    )
      totalCreditCounted += data.courseId.credit;
  });

  console.log(courseGradeInfo);
  console.log(totalCreditCounted);
  console.log(totalCourses);

  // // Sgpa calculation
  let sgpa;
  let sum = 0;
  courseGradeInfo.forEach((data) => {
    if (data.gradeObt == "O") sum += data.credit * 10;
    else if (data.gradeObt == "A+") sum += data.credit * 9;
    else if (data.gradeObt == "A+") sum += data.credit * 9;
    else if (data.gradeObt == "A") sum += data.credit * 8;
    else if (data.gradeObt == "B+") sum += data.credit * 7;
    else if (data.gradeObt == "B") sum += data.credit * 6;
    else if (data.gradeObt == "C") sum += data.credit * 5;
    else if (data.gradeObt == "P") sum += data.credit * 4;
    else sum += data.credit * 0;
  });
  totalGradePointEarned = sum;

  sgpa = sum / totalCreditCounted;

  console.log(totalGradePointEarned);
  console.log(sgpa);

  const prevSemResult = await Result.findOne({
    rollNo: rollno,
    sem: curAcadCourses[0].sem,
  }).select("totalCreditCounted totalGradePointEarned cgpa -_id");

  console.log(prevSemResult);
  // calculate gpa
  let cgpa;
  if (prevSemResult == null) cgpa = sgpa;
  else
    cgpa =
      sgpa +
      (prevSemResult.cgpa * (curAcadCourses[0].sem - 1)) /
        curAcadCourses[0].sem;

  console.log(cgpa);

  // create document to save the result in Result Collection
  console.log(curAcadCourses[0].name);
  console.log(curAcadCourses[0].curAcademic.period);

  const newResult = new Result({
    name: curAcadCourses[0].name,
    rollNo: rollno,
    sem: curAcadCourses[0].sem,
    period: curAcadCourses[0].curAcademic.period,
    session: curAcadCourses[0].curAcademic.session,
    progName: curAcadCourses[0].enrolledProgram,
    deptName: curAcadCourses[0].deptName,
    courses: courseGradeInfo,
    totalCourses: totalCourses,
    totalCreditCounted: totalCreditCounted,
    totalGradePointEarned: totalGradePointEarned,
    sgpa: sgpa,
    cgpa: cgpa,
  });

  await newResult.save();

  return res.status(200).json(newResult);
}

// get results till currently finished semester
async function getAllSemResult(req, res) {
  // find all results till currently finished semester for the logged in student
  try {
    const rollno = req.rollno;

    console.log(rollno);

    const checkResultExist = await Result.find({ rollNo: rollno });
    console.log(checkResultExist[0]);
    // If result doesnot exist then user won't be able to see any result
    if (!checkResultExist.length)
      return res
        .status(403)
        .json({ message: "No result has been published of yours" });

    return res.status(200).json(checkResultExist);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getRunningTranscript(req, res) {
  try {
    const rollno = req.rollno;

    console.log(rollno);

    const curSemRegisterdCourses = await Student.find({ _id: req.id })
      .populate({
        path: "curAcademic",
        populate: {
          path: "coursesEnrolled",
          select: "courseCode courseName credit -_id",
        },
        select: "coursesEnrolled -_id",
      })
      .select("name sem");

    if (!curSemRegisterdCourses.length)
      return res
        .status(204)
        .json({ message: "No courses enrolled for the current semester" });

    // transformation of data for the cur sem courses
    const data =
      curSemRegisterdCourses[0].$getPopulatedDocs()[0].coursesEnrolled;

    console.log(data);
    const checkResultExist = await Result.find({
      rollNo: rollno,
    }).sort({
      sem: 1,
    });

    // transformation of data for each courses corresponding to each semester

    let courseGradeInfoTemp = [];
    let totalCreditCounted = 0;
    let sgpa = 0;
    let cgpa = 0;
    let activeBackLog = 0;
    let withheld = 0;
    let xGrade = 0;
    let iGrade = 0;

    await data.forEach((course) => {
      courseGradeInfoTemp.push({
        courseCode: course.courseCode,
        courseName: course.courseName,
        credit: course.credit,
        gradeObt: "NA",
      });
    });

    let result = {
      name: curSemRegisterdCourses[0].name,
      rollno: rollno,
      prevSemNo: curSemRegisterdCourses[0].sem - 1,
      totalCreditCompleted: totalCreditCounted,
      prevSemSgpa: sgpa,
      cgpa: cgpa,
      activeBackLog: activeBackLog,
      withheld: withheld,
      xGrade: xGrade,
      iGrade: iGrade,
      courses: courseGradeInfoTemp,
    };

    console.log(checkResultExist);
    // If result doesnot exist then user woild be able to see only current sem enrolled courses with NA as obtGrades
    if (!checkResultExist.length) return res.status(403).json(result);

    // if result exist
    let courseGradeInfo = [];

    checkResultExist.forEach((result) => {
      totalCreditCounted += result.totalCreditCounted;
      result.courses.forEach((course) => {
        courseGradeInfo.push({
          courseCode: course.courseCode,
          courseName: course.courseTitle,
          credit: course.credit,
          gradeObt: course.gradeObt,
        });
      });
    });

    // calculate how many backlog and Xgrade, Igrade, and withheld
    let cgiLength = courseGradeInfo.length;
    for (let i = 0; i < cgiLength; i++) {
      if (courseGradeInfo[i].gradeObt == "W") {
        for (let j = i + 1; j < cgiLength; j++) {
          if (courseGradeInfo[j].gradeObt == "W") withheld += 1;
          else if (courseGradeInfo[j].gradeObt == "X") xGrade += 1;
          else if (courseGradeInfo[j].gradeObt == "I") iGrade += 1;
          else if (courseGradeInfo[j].gradeObt == "F") activeBackLog += 1;
        }
      } else if (courseGradeInfo[i].gradeObt == "F") {
        for (let j = i + 1; j < cgiLength; j++) {
          if (courseGradeInfo[j].gradeObt == "W") withheld += 1;
          else if (courseGradeInfo[j].gradeObt == "X") xGrade += 1;
          else if (courseGradeInfo[j].gradeObt == "I") iGrade += 1;
          else if (courseGradeInfo[j].gradeObt == "F") activeBackLog += 1;
        }
      } else if (courseGradeInfo[i].gradeObt == "I") {
        for (let j = i + 1; j < cgiLength; j++) {
          if (courseGradeInfo[j].gradeObt == "W") withheld += 1;
          else if (courseGradeInfo[j].gradeObt == "X") xGrade += 1;
          else if (courseGradeInfo[j].gradeObt == "I") iGrade += 1;
          else if (courseGradeInfo[j].gradeObt == "F") activeBackLog += 1;
        }
      } else if (courseGradeInfo[i].gradeObt == "X") {
        for (let j = i + 1; j < cgiLength; j++) {
          if (courseGradeInfo[j].gradeObt == "W") withheld += 1;
          else if (courseGradeInfo[j].gradeObt == "X") xGrade += 1;
          else if (courseGradeInfo[j].gradeObt == "I") iGrade += 1;
          else if (courseGradeInfo[j].gradeObt == "F") activeBackLog += 1;
        }
      }
    }

    // check that student is still have aenrolled for the same program or not and determine that courses of current sem with NA as gradesObt shoudld be added in running transcript
    if (checkResultExist.length < curSemRegisterdCourses.sem)
      courseGradeInfo.push(courseGradeInfoTemp);

    console.log(
      checkResultExist[checkResultExist.length - 1].sgpa,
      checkResultExist[checkResultExist.length - 1].cgpa
    );

    // now update the result that we have created earlier to get the updated result
    let newResult = {
      totalCreditCompleted: totalCreditCounted,
      prevSemSgpa: checkResultExist[checkResultExist.length - 1].sgpa,
      cgpa: checkResultExist[checkResultExist.length - 1].cgpa,
      activeBackLog: activeBackLog,
      withheld: withheld,
      xGrade: xGrade,
      iGrade: iGrade,
      courses: courseGradeInfo,
    };

    result = { ...result, ...newResult };

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getStudentProfile(req, res) {
  try {
    const id = req.id;
    console.log(id);
    const profile = await Student.findOne({ _id: id }).select(
      "-_id -__v -password -curAcademic"
    );
    console.log(profile);
    if (profile) return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  courseEnrollement,
  getCurSemEnrolledCourses,
  getPrevSemsEnrolledCourses,
  getCourseDetail,
  getProgress,
  getCurSemResult,
  getAllSemResult,
  getRunningTranscript,
  getStudentProfile,
};
