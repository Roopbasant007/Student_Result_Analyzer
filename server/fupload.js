require("dotenv").config();
const express = require("express");
const fs = require("fs");
const XLSX = require("xlsx");
const busboy = require("busboy");
const path = require("path");
const { count } = require("console");
const app = express();
const Marks = require("./models/marks");
const connectDB = require("./config/dbConn");
const bodyParser = require("body-parser");
// parse requests of content-type - application/x-www-form-urlencoded

connectDB();
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

const uploadXLSX = async (req, res) => {
  var filename = "";
  var dateFileName = "";
  // console.log("text data:" + req.body);
  // var sem = req.body.sem;
  // console.log(sem);

  // var { sem, courseCode, session, eType } = req.body;

  // const { noOfQuestions } = req.body;
  // var counter = 0;
  /*
  Counter should be use as a flag when uploading multiple files simultaneously

  This is expected behavior. finish is emitted when the last of the data has been read from the request (this includes any/all emitted file streams, which are subsets of the incoming request data).

  However if you're writing a file stream to disk, it's possible for the file stream to still have the last chunk(s) of data still buffered in memory. This is why the file may not be completely written to disk by the time finish is emitted.

  One common solution for this is to both check a flag that gets set in the busboy finish event handler, and check a counter variable that gets incremented for every fstream close event (comparing it to result.length).

  */
  const bb = busboy({ headers: req.headers });
  bb.on("file", (name, file, info) => {
    // counter++;
    filename = info.filename;
    dateFileName = Date.now() + "-" + filename;
    const saveTo = path.join(`${__dirname}/uploads`, dateFileName);
    var fstream = fs.createWriteStream(saveTo);
    file.pipe(fstream);
    fstream.on("close", function () {
      // console.log(counter);
      // counter--;
      // if (counter == 0) {
      res.writeHead(200, { "Content-Type": "text/plain" });

      res.end(`upload success: ${dateFileName}`);
      // readUploadedFile(dateFileName);

      // }
    });
  });
  return req.pipe(bb);
};

const readUploadedFile = async (filename) => {
  try {
    var workbook = XLSX.readFile(`./uploads/${filename}`);
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
        console.log(COs[j]);
      }
    }
    // console.log(worksheet[Alphabets[1] + `${2}`]?.v);
    // console.log(worksheet.length);
    var k = 3;
    var l = 0;
    var count = 0;
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
        // rollno: rollNo,
        // sem: sem,
        // courseCode: courseCode,
        // session: session,
        // eType: eType,
        CO1: co1,
        CO2: co2,
        CO3: co3,
        CO4: co4,
        CO5: co5,
        CO6: co6,
      });
      console.log(co1, co2, co3, co4, co5, co6);

      let f = 0;
      // await studentMarks.save();
      f = 1;
      if (f == 1) console.log("s");

      // console.log(studentMarks);

      l = 0;
      k++;
    }
  } catch (error) {
    console.log(error);
  }
};
app.post("/upload", uploadXLSX);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("app running on port", port);
});
