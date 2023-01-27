const CourseOutcome = require("../models/courseOutcomeSchema");
const StudentMarks = require("../models/marksSchema");
const Result = require("../models/resultSchema");

// adding Course Outcome and can be search and get using course code
async function addCourseOutcome(req, res) {
  try {
    const { courseCode, CO } = req.body;
    if (!courseCode || !CO)
      return res
        .status(404)
        .json({ message: "Bad Request Empty field are not allowed" });
    const courseOutcome = new CourseOutcome({
      courseCode: courseCode,
      COs: CO,
    });

    await courseOutcome.save();
    return res
      .status(201)
      .json({ message: "Course Outcome added successfully" });
  } catch (error) {
    return res.status(501).json({ message: "Internal Server Error" });
  }
}

async function addMarks(req, res) {
  try {
    const { courseCode, semesterNo, year, type, Marks } = req.body;
    if (!courseCode || !semesterNo || !year || !Marks)
      res
        .status(404)
        .json({ message: "Bad request!! please fill all the fields properly" });
    const obtainedMarks = new StudentMarks({
      courseCode: courseCode,
      semesterNo: semesterNo,
      year: year,
      Marks: Marks,
    });

    await obtainedMarks.save();
    // preparing result of students

    // calculation of average marks of students
    var individualTotal = [];

    var totalMarks = 0;

    if (!type.localeCompare("test1")) {
      let j = 0;
      let temp_marks = 0;
      for (let i = 0; i < Marks.length; i++) {
        temp_marks +=
          Marks[i].test1Marks.CO1 +
          Marks[i].test1Marks.CO2 +
          Marks[i].test1Marks.CO3 +
          Marks[i].test1Marks.CO4 +
          Marks[i].test1Marks.CO5;
        totalMarks += temp_marks;
        individualTotal[j++] = temp_marks;
        temp_marks = 0;
      }
    }

    // if (!type.localeCompare("midSem")) {
    //   for (let i = 0; i < Marks.length; i++) {
    //     let j = 0;
    //     let temp_marks = 0;
    //     temp_marks +=
    //       Marks[i].midSemMarks.CO1 +
    //       Marks[i].midSemMarks.CO2 +
    //       Marks[i].midSemMarks.CO3 +
    //       Marks[i].midSemMarks.CO4 +
    //       Marks[i].midSemMarks.CO5;
    //     totalMarks += temp_marks;
    //     individualTotal[j++] = temp_marks;
    //     temp_marks = 0;
    //   }
    // }

    // if (!type.localeCompare("test2")) {
    //   for (let i = 0; i < Marks.length; i++) {
    //     let j = 0;
    //     let temp_marks = 0;
    //     temp_marks +=
    //       Marks[i].test2Marks.CO1 +
    //       Marks[i].test2Marks.CO2 +
    //       Marks[i].test2Marks.CO3 +
    //       Marks[i].test2Marks.CO4 +
    //       Marks[i].test2Marks.CO5;
    //     totalMarks += temp_marks;
    //     individualTotal[j++] = temp_marks;
    //     temp_marks = 0;
    //   }
    // }

    // if (!type.localeCompare("endSem")) {
    //   for (let i = 0; i < Marks.length; i++) {
    //     let j = 0;
    //     let temp_marks = 0;
    //     temp_marks +=
    //       Marks[i].endSemMarks.CO1 +
    //       Marks[i].endSemMarks.CO2 +
    //       Marks[i].endSemMarks.CO3 +
    //       Marks[i].endSemMarks.CO4 +
    //       Marks[i].endSemMarks.CO5;
    //     totalMarks += temp_marks;
    //     individualTotal[j++] = temp_marks;
    //     temp_marks = 0;
    //   }
    // }

    // Average Marks of student

    var avgMarks = totalMarks / Marks.length;

    // calculation of Standard Deviation

    var sdSum = 0;

    for (let i = 0; i < individualTotal.length; i++) {
      sdSum += (avgMarks - individualTotal[i]) ** 2;
    }
    sdSum = sdSum / individualTotal.length;

    var SD = sdSum ** 0.5;

    console.log(totalMarks, avgMarks);
    console.log(individualTotal, sdSum, SD);

    // grading decision
    for (let i = 0; i < individualTotal.length; i++) {
      if (
        individualTotal[i] >= avgMarks - SD * 0.25 &&
        individualTotal[i] < avgMarks + SD * 0.5
      ) {
        individualTotal[i] = "B+";
      }
      if (
        individualTotal[i] >= avgMarks + SD * 0.5 &&
        individualTotal[i] < avgMarks + SD * 1.5
      ) {
        individualTotal[i] = "A";
      }
      if (
        individualTotal[i] >= avgMarks + SD &&
        individualTotal[i] < avgMarks + 2 * SD
      ) {
        individualTotal[i] = "A+";
      }
      if (individualTotal[i] > avgMarks + 1.5 * SD) {
        individualTotal[i] = "O";
      }
      if (
        individualTotal[i] < avgMarks - SD * 0.25 &&
        individualTotal[i] >= avgMarks - SD
      ) {
        individualTotal[i] = "B";
      }
      if (
        individualTotal[i] < avgMarks - SD &&
        individualTotal[i] >= avgMarks - 1.75 * SD
      ) {
        individualTotal[i] = "C";
      }
      if (
        individualTotal[i] < avgMarks - 1.75 * SD &&
        individualTotal[i] >= avgMarks - 2.5 * SD
      ) {
        individualTotal[i] = "P";
      }
      if (individualTotal[i] < avgMarks - 2.5 * SD) {
        individualTotal[i] = "F";
      }
    }
    console.log("indTotal:" + individualTotal);

    // Result decleration
    var i = 0;
    var j = 0;
    var checkStudent;

    for (let rollNo of Marks) {
      checkStudent = await Result.findOne({
        rollNo: rollNo.rollNo,
        semesterNo: semesterNo,
        courseCode: courseCode,
      });
      // commnents based on performance
      var Comments = "";

      if (individualTotal[i] == "O" || individualTotal[i] == "A+") {
        Comments = "Best performer";
      }
      if (individualTotal[i] == "A") {
        Comments = "Quite Good Performer";
      }
      if (individualTotal[i] == "B+") {
        Comments = "Good Performer";
      }
      if (individualTotal[i] == "B") {
        Comments =
          "Average Performer, Need some more preactice papers and quizzes";
      }
      if (
        individualTotal[i] == "C" ||
        individualTotal[i] == "P" ||
        individualTotal[i] == "F"
      ) {
        Comments =
          "Below Average Performer, Need extra classes, practice papers, and one-on-one mentorship";
      }

      var grade = individualTotal[j++];
      var RollNo = rollNo.rollNo;
      console.log(grade, Comments);
      // if student result of any other subject not exist for current semester exists
      if (checkStudent == null) {
        var tempResult = new Result({
          rollNo: RollNo,
          semesterNo: semesterNo,
          grades: [
            {
              courseCode: courseCode,
              test1: {
                grade: grade,
                comment: Comments,
              },
            },
          ],
        });
        await tempResult.save();
      } else {
        if (type == "") {
          console.log("midterm ka result de bro");
        }
      }
      i++;
    }

    return res
      .status(201)
      .json({ message: "Marks uploaded successfully and result has computed" });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Internal server Error" });
  }
}

module.exports = { addCourseOutcome, addMarks };
