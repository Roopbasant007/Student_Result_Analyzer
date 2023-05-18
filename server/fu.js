require("dotenv").config();
const express = require("express");
// const fs = require("fs");
const XLSX = require("xlsx");
// const busboy = require("busboy");
const path = require("path");
const multer = require("multer");
const app = express();
const Marks = require("./models/marks");
const connectDB = require("./config/dbConn");
// const bodyParser = require("body-parser");

connectDB();

// upload is a middleware

// const upload = multer({
//   storage: multer.diskStorage({
//     destinaton: (req, file, cb) => {
//       cb(null, "./uploads/");
//     },
//     filename: (req, file, cb) => {
//       cb(
//         null,
//         file.originalname //+ "_" + Date.now() + path.extname(file.originalname)
//       );
//     },
//   }),
// }).single("uploadMarks");

const upload = multer({
  storage: multer.diskStorage({
    destination: "./uploads/marks",
    filename: (req, file, cb) => {
      cb(
        null,
        file.originalname.replace(/\.[^/.]+$/, "") +
          "_" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
}).single("uploadMarks");

const readUploadedFile = async (filename, sem, courseCode, session, eType) => {
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
    var noOfQuestions = 5;
    var COs = [];
    for (let i = 2; i < 3; i++) {
      for (let j = 0; j < noOfQuestions; j++) {
        COs[j] = `${worksheet[Alphabets[j + 1] + `${i}`]?.v}`;
        // console.log(COs[j]);
      }
    }
    // console.log(worksheet[Alphabets[1] + `${2}`]?.v);
    // console.log(worksheet.length);
    var k = 3;
    var l = 0;
    // var count = 0;
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

      const studentMarks = new Marks({
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

      console.log(studentMarks);

      l = 0;
      k++;
    }
  } catch (error) {
    console.log(error);
  }
};

app.post("/uploads", upload, (req, res) => {
  // console.log(req.file);
  // console.log(req.file.filename);
  const fname = req.file.filename;
  const { sem, courseCode, session, eType } = req.body;
  readUploadedFile(fname, sem, courseCode, session, eType);

  res.status(201).json({ message: "File Uploaded successfully" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("app running on port", port);
});
