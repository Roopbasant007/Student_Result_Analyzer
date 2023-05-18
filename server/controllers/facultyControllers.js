const XLSX = require("xlsx");
const multer = require("multer");
const Course = require("../models/courseSchema");
const Faculty = require("../models/facultySchema");
const Program = require("../models/programSchema");
const Department = require("../models/departmentSchema");
// const StudentMarks = require("../models/marksSchema");
// const Result = require("../models/resultSchema");
const Marks = require("../models/marks");
const COMaxMarks = require("../models/coWiseMaxMarks");
const FinalMarksInPercentage = require("../models/finalMarksSchema");
const CourseOutcome = require("../models/courseOutcomeSchema");
const Grades = require("../models/gradesSchema");

// Reading of the file content uploaded
const readUploadedFile = async (
  filename,
  sem,
  courseCode,
  session,
  eType,
  dept
) => {
  try {
    var workbook = XLSX.readFile(`./uploads/marks/${filename}`);
    var worksheet = workbook.Sheets[workbook.SheetNames[0]];
    // console.log(sem, courseCode, session, eType);

    var Alphabets = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];

    var noOfQuestions = 0;
    let m = 1;
    while (worksheet[Alphabets[m] + "1"]?.v != undefined) {
      noOfQuestions++;

      m++;
    }
    // console.log(noOfQuestions); // noOfQuestions in each test

    var COs = [];
    for (let i = 2; i < 3; i++) {
      for (let j = 0; j < noOfQuestions; j++) {
        COs[j] = `${worksheet[Alphabets[j + 1] + `${i}`]?.v}`;
        // console.log(COs[j]);
      }
    }

    // Calculations of MaxMarks for individual CO

    var k = 4;
    var l = 0;
    var co1Max = 0;
    var co2Max = 0;
    var co3Max = 0;
    var co4Max = 0;
    var co5Max = 0;
    var co6Max = 0;
    while (l < noOfQuestions) {
      let marks = worksheet[Alphabets[l + 1] + `${3}`]?.v;
      switch (COs[l]) {
        case "CO1":
          co1Max += marks;
          break;
        case "CO2":
          co2Max += marks;
          break;
        case "CO3":
          co3Max += marks;
          break;
        case "CO4":
          co4Max += marks;
          break;
        case "CO5":
          co5Max += marks;
          break;
        case "CO6":
          co6Max += marks;
          break;
      }
      l++;
    }

    const coMaxMark = new COMaxMarks({
      dept: dept,
      sem: sem,
      courseCode: courseCode,
      session: session,
      eType: eType,
      CO1Max: co1Max,
      CO2Max: co2Max,
      CO3Max: co3Max,
      CO4Max: co4Max,
      CO5Max: co5Max,
      CO6Max: co6Max,
    });
    await coMaxMark.save();
    // console.log(coMaxMark);

    var k = 4;
    var l = 0;
    // Calculations of marks obtained by each student in each COs
    while (worksheet[Alphabets[l] + `${k}`]?.v != undefined) {
      // count++;
      var rollNo = worksheet[Alphabets[l] + `${k}`]?.v;
      var co1 = 0;
      var co2 = 0;
      var co3 = 0;
      var co4 = 0;
      var co5 = 0;
      var co6 = 0;
      while (l < noOfQuestions) {
        let marks = worksheet[Alphabets[l + 1] + `${k}`]?.v;
        switch (COs[l]) {
          case "CO1":
            co1 += marks;
            break;
          case "CO2":
            co2 += marks;
            break;
          case "CO3":
            co3 += marks;
            break;
          case "CO4":
            co4 += marks;
            break;
          case "CO5":
            co5 += marks;
            break;
          case "CO6":
            co6 += marks;
            break;
        }
        l++;
      }

      // creation of documents
      const studentMarks = new Marks({
        dept: dept,
        rollno: rollNo,
        sem: sem,
        courseCode: courseCode,
        session: session,
        eType: eType,
        CO1: co1,
        CO2: co2,
        CO3: co3,
        CO4: co4,
        CO5: co5,
        CO6: co6,
      });

      await studentMarks.save();
      // console.log(studentMarks);

      l = 0;
      k++;
    }

    if (eType == "EndTerm") {
      // Calculation of individual COs max marks for all the tests

      const cumCO = await COMaxMarks.find(
        {
          dept: dept,
          sem: sem,
          courseCode: courseCode,
          session: session,
        },
        {
          dept: false,
          sem: false,
          courseCode: false,
          session: false,
          _id: false,
          __v: false,
        }
      );

      const b1 = Object.values(cumCO.filter(({ eType }) => eType === "Test1"));
      const b2 = Object.values(
        cumCO.filter(({ eType }) => eType === "MidTerm")
      );
      const b3 = Object.values(cumCO.filter(({ eType }) => eType === "Test2"));
      const b4 = Object.values(
        cumCO.filter(({ eType }) => eType === "EndTerm")
      );

      // creation of array of COs max marks
      var COsFinalMax = [];

      COsFinalMax[0] =
        b1[0].CO1Max + b2[0].CO1Max + b3[0].CO1Max + b4[0].CO1Max;
      COsFinalMax[1] =
        b1[0].CO2Max + b2[0].CO2Max + b3[0].CO2Max + b4[0].CO2Max;
      COsFinalMax[2] =
        b1[0].CO3Max + b2[0].CO3Max + b3[0].CO3Max + b4[0].CO3Max;
      COsFinalMax[3] =
        b1[0].CO4Max + b2[0].CO4Max + b3[0].CO4Max + b4[0].CO4Max;
      COsFinalMax[4] =
        b1[0].CO5Max + b2[0].CO5Max + b3[0].CO5Max + b4[0].CO5Max;
      COsFinalMax[5] =
        b1[0].CO6Max + b2[0].CO6Max + b3[0].CO6Max + b4[0].CO6Max;

      // ===========================================================================================
      // Final marks of each student in a subject in each COs
      const finalMarks = await Marks.find(
        {
          dept: dept,
          sem: sem,
          courseCode: courseCode,
          session: session,
        },
        {
          dept: false,
          sem: false,
          courseCode: false,
          session: false,
          _id: false,
          __v: false,
        }
      );
      // console.log(finalMarks);

      // In Order to storing the marks in percentage of every student

      var l = 0;
      var k = 4;
      // calculate the total marks in individual COs
      while (worksheet[Alphabets[l] + `${k}`]?.v != undefined) {
        let COsFinal = [-1, -1, -1, -1, -1, -1];

        const rNo = worksheet[Alphabets[l] + `${k}`]?.v;
        const result = finalMarks.filter(({ rollno }) => rollno === rNo);
        // console.log(result);
        // console.log(result[0].CO1);
        // console.log(result[0].eType);
        const a1 = Object.values(
          result.filter(({ eType }) => eType === "Test1")
        );
        const a2 = Object.values(
          result.filter(({ eType }) => eType === "MidTerm")
        );
        const a3 = Object.values(
          result.filter(({ eType }) => eType === "Test2")
        );
        const a4 = Object.values(
          result.filter(({ eType }) => eType === "EndTerm")
        );

        // marks in percentage in each COs by each student
        if (COsFinalMax[0] > 0)
          COsFinal[0] =
            ((a1[0].CO1 + a2[0].CO1 + a3[0].CO1 + a4[0].CO1) / COsFinalMax[0]) *
            100;
        if (COsFinalMax[1] > 0)
          COsFinal[1] =
            ((a1[0].CO2 + a2[0].CO2 + a3[0].CO2 + a4[0].CO2) / COsFinalMax[1]) *
            100;
        if (COsFinalMax[2] > 0)
          COsFinal[2] =
            ((a1[0].CO3 + a2[0].CO3 + a3[0].CO3 + a4[0].CO3) / COsFinalMax[2]) *
            100;
        if (COsFinalMax[3] > 0)
          COsFinal[3] =
            ((a1[0].CO4 + a2[0].CO4 + a3[0].CO4 + a4[0].CO4) / COsFinalMax[3]) *
            100;
        if (COsFinalMax[4] > 0)
          COsFinal[4] =
            ((a1[0].CO5 + a2[0].CO5 + a3[0].CO5 + a4[0].CO5) / COsFinalMax[4]) *
            100;
        if (COsFinalMax[5] > 0)
          COsFinal[5] =
            ((a1[0].CO6 + a2[0].CO6 + a3[0].CO6 + a4[0].CO6) / COsFinalMax[5]) *
            100;

        console.log(
          COsFinal[0],
          COsFinal[1],
          COsFinal[2],
          COsFinal[3],
          COsFinal[4],
          COsFinal[5]
        );

        let grandTotalObtMarks = 0;
        let count = [0, 0, 0, 0, 0, 0]; // it will count the how many COs have benn included the evaluation plan
        for (let i = 0; i < 6; i++) {
          {
            if (COsFinal[i] >= 0) {
              count[i] = 1;
              grandTotalObtMarks += (COsFinal[i] * COsFinalMax[i]) / 100;
            }
          }
        }

        let grandTotalFullMarks = 0;
        for (let i = 0; i < 6; i++) {
          if (count[i] == 1) grandTotalFullMarks += COsFinalMax[i];
        }
        if (grandTotalFullMarks > 0) {
          grandTotalObtMarks = (grandTotalObtMarks / grandTotalFullMarks) * 100;
        }

        const finalMarksInPercent = new FinalMarksInPercentage({
          dept: dept,
          sem: sem,
          courseCode: courseCode,
          session: session,
          rollNo: rNo,
          CO1Total: COsFinal[0],
          CO2Total: COsFinal[1],
          CO3Total: COsFinal[2],
          CO4Total: COsFinal[3],
          CO5Total: COsFinal[4],
          CO6Total: COsFinal[5],
          grandTotal: grandTotalObtMarks,
        });

        await finalMarksInPercent.save();

        k++;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// generating CourseOutcome and ProgramOutcome
const generateProgramOutcome = async (COs, cCode, session) => {
  try {
    const COPOMap = await Course.findOne(
      {
        courseCode: cCode,
        session: session,
      },
      {
        courseCode: false,
        courseName: false,
        courseType: false,
        credit: false,
        semester: false,
        session: false,
        teachingFaculty: false,
        belongingDepartment: false,
        belongingProgram: false,
        _id: false,
        __v: false,
      }
    );

    // console.log(COs);

    let copoMap = Object.values(COPOMap.CoPoMap);
    let sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < 6; i++) {
      let CPM = Object.values(copoMap[i]);

      for (let j = 0; j < 15; j++) {
        // check if for each COs corresponding Pos have positive value
        if (CPM[j] > 0) {
          CPM[j] = CPM[j] * (COs[i] / 3);
          sum[j] = sum[j] + CPM[j];
          count[j] = count[j] + 1;
        }
      }

      // console.log(sum, count);
      // console.log("After:" + CPM);
    }
    // console.log(sum, count);
    // calculation of average of COs corresponding to each PO
    let PO = 0;
    let cnt = 0;
    for (let i = 0; i < 15; i++) {
      if (sum[i] > 0) {
        PO += sum[i] / count[i];
        cnt++;
      }
    }
    // console.log(PO, cnt);
    return PO / cnt;
  } catch (error) {
    console.log(error);
  }
};

const decideTopper = async (sMarks) => {
  try {
    // condition for toppers grade
    let topperResult = { Grade: "", Mark: 0 };
    let maxMark = 0;
    sMarks.forEach((marks) => {
      maxMark = Math.max(maxMark, marks.grandTotal);
    });
    console.log(maxMark);

    // consition for topper grade decision

    if (maxMark >= 80) {
      topperResult.Grade = "O";
      topperResult.Mark = maxMark;
    } else if (maxMark >= 75) {
      topperResult.Grade = "A+";
      topperResult.Mark = maxMark;
    } else if (maxMark >= 65) {
      topperResult.Grade = "A";
      topperResult.Mark = maxMark;
    } else if (maxMark >= 55) {
      topperResult.Grade = "B+";
      topperResult.Mark = maxMark;
    } else if (maxMark >= 45) {
      topperResult.Grade = "B";
      topperResult.Mark = maxMark;
    } else if (maxMark >= 35) {
      topperResult.Grade = "C";
      topperResult.Mark = maxMark;
    } else if (maxMark >= 25) {
      topperResult.Grade = "P";
      topperResult.Mark = maxMark;
    } else {
      topperResult.Grade = "F";
      topperResult.Mark = maxMark;
    }
    return topperResult;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const genRelativeGrading = async (topper, sMarks) => {
  try {
    let grade = "";
    sMarks.forEach((marks) => {
      console.log(marks.grandTotal);
      if (marks.grandTotal >= topper.Mark - 3) grade = `${topper.Grade}`;
      else if (marks.grandTotal >= topper.Mark - 8) {
        if (topper.Grade == "O") grade = "A+";
        else if (topper.Grade == "A+") grade = "A";
        else if (topper.Grade == "A") grade = "B+";
        else if (topper.Grade == "B+") grade = "B";
        else if (topper.Grade == "B") grade = "C";
        else if (topper.Grade == "C") grade = "P";
        else if (topper.Grade == "P") grade = "F";
      } else if (marks.grandTotal >= topper.Mark - 14) {
        if (topper.Grade == "O") grade = "A";
        else if (topper.Grade == "A+") grade = "B+";
        else if (topper.Grade == "A") grade = "B";
        else if (topper.Grade == "B+") grade = "C";
        else if (topper.Grade == "B") grade = "P";
        else if (topper.Grade == "C") grade = "F";
        else if (topper.Grade == "P") grade = "F";
      } else if (marks.grandTotal >= topper.Mark - 21) {
        if (topper.Grade == "O") grade = "B+";
        else if (topper.Grade == "A+") grade = "B";
        else if (topper.Grade == "A") grade = "C";
        else if (topper.Grade == "B+") grade = "P";
        else if (topper.Grade == "B") grade = "F";
        else if (topper.Grade == "C") grade = "F";
        else if (topper.Grade == "P") grade = "F";
      } else if (marks.grandTotal >= topper.Mark - 29) {
        if (topper.Grade == "O") grade = "B";
        else if (topper.Grade == "A+") grade = "C";
        else if (topper.Grade == "A") grade = "P";
        else grade = "F";
      } else if (marks.grandTotal >= topper.Mark - 43) {
        if (topper.Grade == "O") grade = "C";
        else if (topper.Grade == "A+") grade = "P";
        else grade = "F";
      } else if (marks.grandTotal >= topper.Mark - 55) {
        if (topper.Grade == "O") grade = "P";
        else grade = "F";
      }
      console.log(grade);
    });
  } catch (error) {
    throw error;
  }
};

const relativeGradingUsingClustering = async (topper, sMarks) => {
  console.log(sMarks.length);

  //cluster the data around mean
  let mean, sd;
  let sum1 = 0;
  let sum2 = 0;
  // calculation of mean
  sMarks.forEach((marks) => {
    sum1 += parseFloat(marks.grandTotal);
  });
  mean = sum1 / parseFloat(sMarks.length);

  // calculation of standard devaition

  sMarks.forEach((marks) => {
    sum2 += parseFloat(Math.pow(marks.grandTotal - mean, 2));
  });
  sd = Math.sqrt(sum2 / parseFloat(studentMarks.length));
  console.log(mean, sd);
};

// adding of student marks for every
async function studentMarks(req, res) {
  try {
    const fname = req.file.filename;
    const { session, dept, eType, sem, courseCode } = req.body;
    console.log(fname, session, dept, sem, courseCode, eType);
    if (!fname || !session || !dept || !sem || !courseCode || !eType) {
      return res
        .status(404)
        .json({ message: "Please fill up the required field properly" });
    }
    // const CheckMarksExist = await Marks.find({
    //   courseCode: courseCode,
    //   session: session,
    //   eType: eType,
    // });
    // console.log(CheckMarksExist);
    // if (CheckMarksExist != null)
    //   return res.status(403).json({ message: "Marks already Uploaded" });

    readUploadedFile(fname, sem, courseCode, session, eType, dept);
    return res.status(201).json("Marks Uploaded successfully");
  } catch (error) {
    console.log(error);
    res.status(501).json("Internal Server Error");
  }
}

// adding course along with CO-PP mapping
async function addCourseAndOutcome(req, res) {
  try {
    const {
      cCode,
      cName,
      cType,
      credit,
      semester,
      session,
      CoPoMap,
      teachingFac,
      belongingProg,
      belongingDept,
    } = req.body;
    if (
      !cCode ||
      !cName ||
      !cType ||
      !credit ||
      !semester ||
      !session ||
      !CoPoMap
    )
      return res
        .status(404)
        .json({ message: "Bad Request Empty field are not allowed" });
    const teachingFaculty = await Faculty.findOne({ email: teachingFac });
    const belongingProgram = await Program.findOne({ progCode: belongingProg });
    const belongingDepartment = await Department.findOne({
      deptCode: belongingDept,
    });
    console.log(teachingFaculty._id, belongingProgram, belongingDepartment);
    const course = new Course({
      courseCode: cCode,
      courseName: cName,
      courseType: cType,
      credit: credit,
      semester: semester,
      session: session,
      CoPoMap: CoPoMap,
      teachingFaculty: teachingFaculty._id,
      belongingProgram: belongingProgram._id,
      belongingDepartment: belongingDepartment._id,
    });

    await course.save();
    return res
      .status(201)
      .json({ message: "Course added with Course Outcome successfully" });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Internal Server Error" });
  }
}

// Generate Final Course Outcome
async function generateFinalCourseAndProgramOutcome(req, res) {
  try {
    const { session, dept, sem, courseCode, threshold, thresholdForCO } =
      req.body;

    // console.log(session, dept, sem, courseCode, threshold);

    if (!session || !dept || !sem || !courseCode || !threshold)
      return res
        .status(404)
        .json({ message: "All the mandatory field should be filled properly" });

    const checkCOExist = await CourseOutcome.findOne(
      {
        courseCode: courseCode,
        session: session,
        sem: sem,
        dept: dept,
      },
      {
        courseCode: false,
        session: false,
        sem: false,
        dept: false,
        _id: false,
        __v: false,
      }
    );

    // console.log(checkCOExist);

    if (checkCOExist) return res.status(403).json(checkCOExist);

    const studentMarks = await FinalMarksInPercentage.find(
      {
        session: session,
        dept: dept,
        sem: sem,
        courseCode: courseCode,
      },
      {
        dept: false,
        sem: false,
        courseCode: false,
        session: false,
        _id: false,
        __v: false,
      }
    );
    // console.log(studentMarks);

    const length = studentMarks.length;
    const cnt = [0, 0, 0, 0, 0, 0];

    for (let i = 0; i < length; i++) {
      if (studentMarks[i].CO1Total >= threshold) cnt[0]++;
      if (studentMarks[i].CO2Total >= threshold) cnt[1]++;
      if (studentMarks[i].CO3Total >= threshold) cnt[2]++;
      if (studentMarks[i].CO4Total >= threshold) cnt[3]++;
      if (studentMarks[i].CO5Total >= threshold) cnt[4]++;
      if (studentMarks[i].CO6Total >= threshold) cnt[5]++;
    }

    // console.log(cnt);
    const COsInPercent = [];

    for (let i = 0; i < 6; i++) {
      COsInPercent.push((cnt[i] / length) * 100);
    }
    // console.log(COsInPercent);

    // COs value on scale of 1 to 3
    const COs = [];
    const th1 = thresholdForCO;
    const th2 = thresholdForCO + 10;
    const th3 = thresholdForCO + 20;

    for (let i = 0; i < 6; i++) {
      if (COsInPercent[i] >= th3) COs.push(3);
      else if (COsInPercent[i] >= th2)
        COs.push(2 + (COsInPercent[i] - th2) / 10);
      else if (COsInPercent[i] >= th1)
        COs.push(1 + (COsInPercent[i] - th1) / 10);
      else COs.push(0);
    }

    // calculation of POs
    const PO = await generateProgramOutcome(COs, courseCode, session);

    // console.log(COs);
    // Saves the finalCourse on sacle of 1 to 3.
    const finalCOs = new CourseOutcome({
      courseCode: courseCode,
      session: session,
      sem: sem,
      dept: dept,
      CO1: COs[0],
      CO2: COs[1],
      CO3: COs[2],
      CO4: COs[3],
      CO5: COs[4],
      CO6: COs[5],
      PO: PO,
    });

    await finalCOs.save();

    let data = {
      CO1: COs[0],
      CO2: COs[1],
      CO3: COs[2],
      CO4: COs[3],
      CO5: COs[4],
      CO6: COs[5],
      PO: PO,
    };

    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Internal Server Error" });
  }
}

// Get Course Outcome and Program Outcome
async function getCOPO(req, res) {
  try {
    const { courseCode, session, sem } = req.body;
    if (!courseCode || !session || !sem)
      return res.status(403).json({
        message: "either coursecode, session or sem is not fill properly",
      });
    const checkCOPOExist = await CourseOutcome.findOne(
      {
        curseCode: courseCode,
        session: session,
        sem: sem,
      },
      {
        courseCode: false,
        session: false,
        sem: false,
        dept: false,
        _id: false,
        __v: false,
      }
    );

    // Resource doesnot exist
    if (!checkCOPOExist)
      return res
        .status(404)
        .josn({ message: "No such CO and PO for this course" });

    // resource exist so return back targeted resource
    return res.status(200).json(checkCOPOExist);
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Internal server error" });
  }
}

// Get students result
async function generateStudentsResult(req, res) {
  try {
    const { session, sem, cCode, maxGradeToTopper, percentageForTopperGrade } =
      req.body;
    // check if  the supplied parameter are sufficient or not
    if (!session || !sem || !cCode)
      return res
        .status(404)
        .json({ message: "Either session or sem or cCode is empty" });

    // check if that final marks of student for the supplied cCode course exist for the supplied session or not
    const checkFinalMarksExist = await FinalMarksInPercentage.find(
      { courseCode: cCode, session: session },
      {
        _id: 0,
        rollNo: 1,
        grandTotal: 1,
      }
    ).sort({ rollNo: 1 });

    if (!checkFinalMarksExist)
      return res.status(403).status({
        message: "Sorry, seems like marks for end sem hasnot been uploaded",
      });

    // now first find the topper's grade
    let topper = { Grade: "", Mark: 0 };

    if (maxGradeToTopper != null && percentageForTopperGrade != 0) {
      topper.Grade = maxGradeToTopper;
      topper.Mark = percentageForTopperGrade;
      const relativeGrade = await genRelativeGrading(
        topper,
        checkFinalMarksExist
      );
    } else {
      let topper1 = await decideTopper(checkFinalMarksExist);
      const relativeGrade = await genRelativeGrading(
        topper1,
        checkFinalMarksExist
      );
    }

    // decide the others grade relatively to topper method 1

    // decide the student result using clustering method
    // const result = await relativeGradingUsingClustering(
    //   topper,
    //   checkFinalMarksExist
    // );

    return res.status(200).json({ message: "Result has been calculated" });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Internal Server error" });
  }
}

// get student marks in order to decide the range for marks calculation

async function getTempResult(req, res) {
  try {
    const { courseCode, session } = req.body;
    if (!courseCode || !session)
      return res
        .status(404)
        .json({ message: "either CourseCode or Session are empty" });
    const checkFinalMarksExist = await FinalMarksInPercentage.find(
      { courseCode: courseCode, session: session },
      {
        _id: 0,
        rollNo: 1,
        grandTotal: 1,
      }
    ).sort({ rollNo: 1 });

    if (!checkFinalMarksExist)
      return res.status(403).json({ message: "resource access denied" });

    // calculation of mean and standard deviation
    let mean, sd;
    let sum1 = 0;
    let sum2 = 0;
    // calculation of mean
    checkFinalMarksExist.forEach((marks) => {
      sum1 += parseFloat(marks.grandTotal);
    });
    mean = sum1 / parseFloat(checkFinalMarksExist.length);

    // calculation of standard devaition

    checkFinalMarksExist.forEach((marks) => {
      sum2 += parseFloat(Math.pow(marks.grandTotal - mean, 2));
    });
    sd = Math.sqrt(sum2 / parseFloat(studentMarks.length));
    console.log(mean, sd);

    // Ranges for the grades
    let range = [
      {
        max: 100,
        min: 80,
      },
      {
        max: 80,
        min: 75,
      },
      {
        max: 75,
        min: 65,
      },
      {
        max: 65,
        min: 55,
      },
      {
        max: 55,
        min: 40,
      },
      {
        max: 40,
        min: 30,
      },
      {
        max: 30,
        min: 25,
      },
      {
        max: 25,
        min: 0,
      },
    ];

    let result = [];

    checkFinalMarksExist.forEach((marks) => {
      let grade;

      // Decide the grade based on the range of marks for grading
      if (marks.grandTotal >= range[0].min && marks.grandTotal <= range[0].max)
        grade = "O";
      else if (
        marks.grandTotal >= range[1].min &&
        marks.grandTotal < range[1].max
      )
        grade = "A+";
      else if (
        marks.grandTotal >= range[2].min &&
        marks.grandTotal < range[2].max
      )
        grade = "A";
      else if (
        marks.grandTotal >= range[3].min &&
        marks.grandTotal < range[3].max
      )
        grade = "B+";
      else if (
        marks.grandTotal >= range[4].min &&
        marks.grandTotal < range[4].max
      )
        grade = "B";
      else if (
        marks.grandTotal >= range[5].min &&
        marks.grandTotal < range[5].max
      )
        grade = "C";
      else if (
        marks.grandTotal >= range[6].min &&
        marks.grandTotal < range[6].max
      )
        grade = "P";
      else if (
        marks.grandTotal >= range[7].min &&
        marks.grandTotal < range[7].max
      )
        grade = "F";

      result.push(grade);
    });

    // calculation of no of students achieved a particular grade

    let count = [0, 0, 0, 0, 0, 0, 0, 0];
    result.forEach((grades) => {
      if (grades == "O") count[0]++;
      else if (grades == "A+") count[1]++;
      else if (grades == "A") count[2]++;
      else if (grades == "B+") count[3]++;
      else if (grades == "B") count[4]++;
      else if (grades == "C") count[5]++;
      else if (grades == "P") count[6]++;
      else if (grades == "F") count[7]++;
    });

    let fR = {
      O: count[0],
      "A+": count[1],
      A: count[2],
      "B+": count[3],
      B: count[4],
      C: count[5],
      P: count[6],
      F: count[7],
    };

    console.log(fR);
    return res.status(200).json(fR);
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Internal server error" });
  }
}

// generate the final result
async function generateGrades(req, res) {
  const { cCode, session, range } = req.body;

  // check if the required field are empty or not
  if (!cCode || !session || !range)
    return res
      .status(404)
      .json({ message: "either courseCode or session or range is empty" });

  // check if the marks for the courseCode and session exist or not
  const checkFinalMarksExist = await FinalMarksInPercentage.find(
    { courseCode: cCode, session: session },
    {
      _id: 0,
      rollNo: 1,
      grandTotal: 1,
    }
  ).sort({ rollNo: 1 });

  if (!checkFinalMarksExist)
    return res.status(403).json({ message: "resource access denied" });

  // if marks exist then calculate the result of student using supplied range
  let result = [];
  checkFinalMarksExist.forEach((marks) => {
    let grade;

    // Decide the grade based on the range of marks for grading
    if (marks.grandTotal >= range[0].min && marks.grandTotal <= range[0].max)
      grade = "O";
    else if (
      marks.grandTotal >= range[1].min &&
      marks.grandTotal < range[1].max
    )
      grade = "A+";
    else if (
      marks.grandTotal >= range[2].min &&
      marks.grandTotal < range[2].max
    )
      grade = "A";
    else if (
      marks.grandTotal >= range[3].min &&
      marks.grandTotal < range[3].max
    )
      grade = "B+";
    else if (
      marks.grandTotal >= range[4].min &&
      marks.grandTotal < range[4].max
    )
      grade = "B";
    else if (
      marks.grandTotal >= range[5].min &&
      marks.grandTotal < range[5].max
    )
      grade = "C";
    else if (
      marks.grandTotal >= range[6].min &&
      marks.grandTotal < range[6].max
    )
      grade = "P";
    else if (
      marks.grandTotal >= range[7].min &&
      marks.grandTotal < range[7].max
    )
      grade = "F";

    const gradesObt = new Grades({
      courseCode: cCode,
      session: session,
      rollNo: marks.rollNo,
      gradeObt: grade,
    });

    result.push(gradesObt);
  });

  // Once the array of result has been generated then create the document of Grade collection
  await Grades.insertMany(result);
  return res.status(200).json({ message: "Grading has been finished", result });
}
module.exports = {
  addCourseAndOutcome,
  studentMarks,
  generateFinalCourseAndProgramOutcome,
  getCOPO,
  generateStudentsResult,
  getTempResult,
  generateGrades,
};
