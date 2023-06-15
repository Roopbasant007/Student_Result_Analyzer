const XLSX = require("xlsx");
const multer = require("multer");
const Course = require("../models/courseSchema");
// const StudentMarks = require("../models/marksSchema");
// const Result = require("../models/resultSchema");
const Marks = require("../models/marks");
const COMaxMarks = require("../models/coWiseMaxMarks");
const FinalMarksInPercentage = require("../models/finalMarksSchema");
const CourseOutcome = require("../models/courseOutcomeSchema");
const Grades = require("../models/gradesSchema");
const ProgramOutcome = require("../models/programOutcomeSchema");

// Reading of the file content uploaded
const readUploadedFile = async (filename, eType, courseId) => {
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

    let coMaxTotal = co1Max + co2Max + co3Max + co4Max + co5Max + co6Max;
    // console.log("comaxtotal:" + coMaxTotal);
    const coMaxMark = new COMaxMarks({
      courseId: courseId,
      eType: eType,
      CO1Max: co1Max,
      CO2Max: co2Max,
      CO3Max: co3Max,
      CO4Max: co4Max,
      CO5Max: co5Max,
      CO6Max: co6Max,
      maxMarks: coMaxTotal,
    });
    await coMaxMark.save();
    // console.log(coMaxMark);

    // declare an array to store the marks of each student and then use a single database operation for bulk write
    let studentsMarks = [];
    let updateMarks = [];

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

      let total = co1 + co2 + co3 + co4 + co5 + co6;
      let percentage = (total / coMaxTotal) * 100;
      // console.log("total:" + total);
      // console.log("perct:" + percentage);
      let categorization = "";

      // deteemining the category of student based on their percentage marks obtained in each sessional
      if (eType == "Test1" || eType == "Test2") {
        if (percentage >= 90) categorization = "Excellent";
        else if (percentage >= 80) categorization = "Very Good";
        else if (percentage >= 70) categorization = "Good";
        else if (percentage >= 56) categorization = "Average";
        else if (percentage >= 44) categorization = "Below Average";
        else if (percentage >= 32) categorization = "Poor";
        else if (percentage >= 24) categorization = "Pass";
        else categorization = "Fail";
      }

      if (eType == "MidTerm" || eType == "EndTerm") {
        if (percentage >= 85) categorization = "Excellent";
        else if (percentage >= 76) categorization = "Very Good";
        else if (percentage >= 66) categorization = "Good";
        else if (percentage >= 54) categorization = "Average";
        else if (percentage >= 42) categorization = "Below Average";
        else if (percentage >= 35) categorization = "Poor";
        else if (percentage >= 27) categorization = "Pass";
        else categorization = "Fail";
      }

      // console.log("categorization:" + categorization);

      // creation of documents
      const studentMarks = new Marks({
        rollno: rollNo,
        courseId: courseId,
        eType: eType,
        CO1: co1,
        CO2: co2,
        CO3: co3,
        CO4: co4,
        CO5: co5,
        CO6: co6,
        total: total,
        category: categorization,
      });

      studentsMarks.push(studentMarks);

      // await studentMarks.save();
      // console.log(studentMarks);

      l = 0;
      k++;
    }

    // saving studentsmarks into database with bulk write operation
    await Marks.insertMany(studentsMarks);

    if (eType == "EndTerm") {
      // Calculation of individual COs max marks for all the tests

      const cumCO = await COMaxMarks.find(
        {
          courseId: courseId,
        },
        {
          courseId: false,
          maxMarks: false,
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
          courseId: courseId,
        },
        {
          total: false,
          categorization: false,
          courseId: false,
          _id: false,
          __v: false,
        }
      );
      // console.log(finalMarks);

      let finalMarksInPercentages = [];

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
        let count = [0, 0, 0, 0, 0, 0]; // it will count the how many COs have been included for the evaluation plan
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
          rollNo: rNo,
          courseId: courseId,
          CO1Total: COsFinal[0],
          CO2Total: COsFinal[1],
          CO3Total: COsFinal[2],
          CO4Total: COsFinal[3],
          CO5Total: COsFinal[4],
          CO6Total: COsFinal[5],
          grandTotal: grandTotalObtMarks,
        });

        finalMarksInPercentages.push(finalMarksInPercent);
        // await finalMarksInPercent.save();

        k++;
      }

      // bulk write operation for saving the student marks in percentage for grade calculation and also in Co-Po calculation
      await FinalMarksInPercentage.insertMany(finalMarksInPercentages);
    }
  } catch (error) {
    console.log(error);
  }
};

// generating CourseOutcome and ProgramOutcome
const generateProgramOutcome = async (COs, courseID) => {
  try {
    const COPOMap = await Course.findOne(
      {
        _id: courseID,
      },
      {
        courseCode: false,
        courseName: false,
        courseType: false,
        credit: false,
        semester: false,
        session: false,
        period: false,
        teachingFaculty: false,
        belongingDepartment: false,
        belongingProgram: false,
        _id: false,
        __v: false,
      }
    );

    // console.log(COs);

    let copoMap = Object.values(COPOMap.CoPoMap);
    let sum = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    for (let i = 0; i < 6; i++) {
      let CPM = Object.values(copoMap[i]);

      for (let j = 0; j < 15; j++) {
        // check if for each COs corresponding Pos have positive value
        if (CPM[j] > 0) {
          CPM[j] = CPM[j] * (COs[i] / 3);
          sum[0][j] = sum[0][j] + CPM[j];
          sum[1][j] = sum[1][j] + 1;
        }
      }
      // console.log("After:" + CPM);
    }
    // console.log(sum, count);
    // calculation of average of COs corresponding to each PO
    let poValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let ProgOutcome = 0;
    let cnt = 0;
    for (let i = 0; i < 15; i++) {
      if (sum[0][i] > 0) {
        ProgOutcome += sum[0][i] / sum[1][i];
        poValue[i] = sum[0][i] / sum[1][i];
        cnt++;
      }
    }

    poValue.push(ProgOutcome / cnt);

    const newProgOutcome = new ProgramOutcome({
      courseId: courseID,
      PO1: poValue[0],
      PO2: poValue[1],
      PO3: poValue[2],
      PO4: poValue[3],
      PO5: poValue[4],
      PO6: poValue[5],
      PO7: poValue[6],
      PO8: poValue[7],
      PO9: poValue[8],
      PO10: poValue[9],
      PO11: poValue[10],
      PO12: poValue[11],
      PSO1: poValue[12],
      PSO2: poValue[13],
      PSO3: poValue[14],
      PO: poValue[15],
    });

    await newProgOutcome.save();

    // console.log(PO, cnt);
    return poValue;
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
      } else if (marks.grandTotal >= topper.Mark - 20) {
        if (topper.Grade == "O") grade = "B+";
        else if (topper.Grade == "A+") grade = "B";
        else if (topper.Grade == "A") grade = "C";
        else if (topper.Grade == "B+") grade = "P";
        else if (topper.Grade == "B") grade = "F";
        else if (topper.Grade == "C") grade = "F";
        else if (topper.Grade == "P") grade = "F";
      } else if (marks.grandTotal >= topper.Mark - 26) {
        if (topper.Grade == "O") grade = "B";
        else if (topper.Grade == "A+") grade = "C";
        else if (topper.Grade == "A") grade = "P";
        else grade = "F";
      } else if (marks.grandTotal >= topper.Mark - 36) {
        if (topper.Grade == "O") grade = "C";
        else if (topper.Grade == "A+") grade = "P";
        else grade = "F";
      } else if (marks.grandTotal >= topper.Mark - 42) {
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

  return mean, sd;

  // generate the range for grading
  let range = [
    {
      min: 0,
      max: 0,
    },
    {
      min: 0,
      max: 0,
    },
    {
      min: 0,
      max: 0,
    },
    {
      min: 0,
      max: 0,
    },
    {
      min: 0,
      max: 0,
    },
    {
      min: 0,
      max: 0,
    },
    {
      min: 0,
      max: 0,
    },
    {
      min: 0,
      max: 0,
    },
  ];

  if (mean - sd / 2 > 0 && mean - sd > 50) {
    range[3].min = mean - sd / 2;
    range[3].max = mean + sd / 2;
  }
};

// adding of student marks for every sessional exam
async function studentMarks(req, res) {
  try {
    const courseId = req.params.id;
    const { eType } = req.body;
    const fname = req.file.filename;
    console.log(courseId, eType, fname);
    if (!fname || !eType || !courseId) {
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

    readUploadedFile(fname, eType, courseId);
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
      period,
      CoPoMap,
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
      !period ||
      !CoPoMap
    )
      return res
        .status(404)
        .json({ message: "Bad Request Empty field are not allowed" });

    console.log(req.id);
    const course = new Course({
      courseCode: cCode,
      courseName: cName,
      courseType: cType,
      credit: credit,
      semester: semester,
      session: session,
      period: period,
      CoPoMap: CoPoMap,
      teachingFaculty: req.id,
      belongingProgram: belongingProg,
      belongingDepartment: belongingDept,
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
    const courseID = req.params.id;
    const { threshold, thresholdForCO } = req.body;

    console.log(threshold, thresholdForCO);

    if (!threshold)
      return res
        .status(404)
        .json({ message: "All the mandatory field should be filled properly" });

    const checkCOExist = await CourseOutcome.findOne(
      {
        courseId: courseID,
      },
      {
        courseId: false,
        _id: false,
        __v: false,
      }
    );

    const checkPoExist = await ProgramOutcome.findOne({
      courseId: courseID,
    }).select("-_id -__v -courseId");

    if (checkCOExist && checkPoExist)
      return res.status(200).json({ CO: checkCOExist, PO: checkPoExist });

    const studentMarks = await FinalMarksInPercentage.find(
      {
        courseId: courseID,
      },
      {
        courseId: false,
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
    const poValue = await generateProgramOutcome(COs, courseID);

    console.log(poValue[0]);
    // Saves the finalCourseOutcome on scale of 1 to 3.
    const finalCOs = new CourseOutcome({
      courseId: courseID,
      CO1: COs[0],
      CO2: COs[1],
      CO3: COs[2],
      CO4: COs[3],
      CO5: COs[4],
      CO6: COs[5],
    });

    await finalCOs.save();

    let CourseOutcomes = {
      CO1: COs[0],
      CO2: COs[1],
      CO3: COs[2],
      CO4: COs[3],
      CO5: COs[4],
      CO6: COs[5],
    };

    let ProgramOutcomes = {
      PO1: poValue[0],
      PO2: poValue[1],
      PO3: poValue[2],
      PO4: poValue[3],
      PO5: poValue[4],
      PO6: poValue[5],
      PO7: poValue[6],
      PO8: poValue[7],
      PO9: poValue[8],
      PO10: poValue[9],
      PO11: poValue[10],
      PO12: poValue[11],
      PSO1: poValue[12],
      PSO2: poValue[13],
      PSO3: poValue[14],
      PO: poValue[15],
    };

    return res.status(200).json({ CO: CourseOutcomes, PO: ProgramOutcomes });
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Internal Server Error" });
  }
}

// Get Course Outcome and Program Outcome
async function getCOPO(req, res) {
  try {
    const courseID = req.params.id;
    const checkCOExist = await CourseOutcome.findOne(
      {
        courseId: courseID,
      },
      {
        courseId: false,
        _id: false,
        __v: false,
      }
    );

    const checkPoExist = await ProgramOutcome.findOne({
      courseId: courseID,
    }).select("-_id -__v -courseId");

    // Resource doesnot exist
    if (!checkCOExist && !checkPoExist)
      return res.status(204).json({ CO: checkCOExist, PO: checkPoExist });

    // resource exist so return back targeted resource
    return res.status(200).json({ CO: checkCOExist, PO: checkPoExist });
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
    const result = await relativeGradingUsingClustering(
      topper,
      checkFinalMarksExist
    );

    return res.status(200).json({ message: "Result has been calculated" });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Internal Server error" });
  }
}

// get student marks in order to decide the range for marks calculation

async function getTempGrades(req, res) {
  try {
    const courseID = req.params.id;

    const checkFinalMarksExist = await FinalMarksInPercentage.find(
      { courseId: courseID },
      {
        _id: 0,
        rollNo: 1,
        grandTotal: 1,
      }
    ).sort({ rollNo: 1 });

    if (!checkFinalMarksExist)
      return res
        .status(203)
        .json({ message: "Marks For Course Has Not Been Uploaded Yet" });

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

    // determine the range for grading using clustering technique

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

    let gradeFreq = {
      O: count[0],
      Aplus: count[1],
      A: count[2],
      Bplus: count[3],
      B: count[4],
      C: count[5],
      P: count[6],
      F: count[7],
    };

    return res.status(200).json(checkFinalMarksExist);
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "Internal server error" });
  }
}

// generate the final result
async function generateGrades(req, res) {
  try {
    const { range } = req.body;
    const courseID = req.params.courseId;
    console.log(courseID);

    // check if the required field are empty or not
    if (!range) return res.status(404).json({ message: "Range is empty" });

    // check if the marks for the courseCode and session exist or not
    const checkFinalMarksExist = await FinalMarksInPercentage.find(
      { courseId: courseID },
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
        courseId: courseID,
        rollNo: marks.rollNo,
        gradeObt: grade,
      });

      result.push(gradesObt);
    });

    // Once the array of result has been generated then create the document of Grade collection
    await Grades.insertMany(result);
    return res
      .status(200)
      .json({ message: "Grading has been finished", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// file uploader

module.exports = {
  addCourseAndOutcome,
  studentMarks,
  generateFinalCourseAndProgramOutcome,
  getCOPO,
  generateStudentsResult,
  getTempGrades,
  generateGrades,
};
