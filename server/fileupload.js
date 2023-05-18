require("dotenv").config();
const express = require("express");
const multer = require("multer");
const connectDB = require("./config/dbConn");
const EData = require("./models/marks");
var XLSX = require("xlsx");
const busboy = require("busboy");
const fs = require("fs");
const path = require("path");
const app = express();
const Excel = require("exceljs");
var csv = require("csv-parser");
var parse = require("csv-parser");

connectDB();

var readUploadedFile = (filename) => {
  // var fname = "sample.csv";
  // console.log(filename);
  // const workBook = XLSX.readFile(filename);
  // XLSX.writeFile(workBook, `./uploads/${fname}`, { bookType: "csv" });
  // console.log(fname);

  // var fileData = [];
  // fs.createReadStream(`./uploads/${filename}`)
  //   .pipe(csv({}))
  //   .on("data", (data) => fileData.push(data))
  //   .on("end", () => {
  //     console.log(fileData);
  //   });
  var rowData = [];
  var workbook = new Excel.Workbook();
  var data = workbook.csv.readFile(`./uploads/${filename}`).then(function () {
    var worksheet = workbook.getWorksheet(1);
    worksheet.eachRow(function (row, rowNumber) {
      row.eachCell((cell, num) => {
        let str = new Buffer.from(cell.value).toString("utf8");
      });
    });
  });
  fs.readFile(`./uploads/${filename}`, function (err, fileData) {
    parse(fileData, { columns: false, trim: true }, function (err, rows) {
      // Your CSV data is in an array of arrys passed to this callback as rows.
      for (var i = 0; i < rows.length(); i++) {
        rowData.push(rows[i]);
      }
    });
  });
  // Printing data
  // console.log(rowData);
};

const uploadXLSX = async (req, res, next) => {
  // try {
  //   let path = req.file.path;
  //   var workbook = XLSX.readFile(path);
  //   var sheet_name_list = workbook.SheetNames;
  //   let jsonData = XLSX.utils.sheet_to_json(
  //     workbook.Sheets[sheet_name_list[0]]
  //   );
  //   console.log(req.file.filename);
  //   if (jsonData.length === 0) {
  //     return res.status(400).json({
  //       success: false,

  //       message: "xml sheet has no data",
  //     });
  //   }

  //   return res.status(201).json({
  //     success: true,
  //     message: savedData.length + " rows added to the database",
  //   });
  // } catch (err) {
  //   return res.status(500).json({ success: false, message: err.message });
  // }
  let filename = "";
  let dateFileName = "";
  const bb = busboy({ headers: req.headers });
  bb.on("file", (name, file, info) => {
    filename = info.filename;
    dateFileName = Date.now() + "-" + filename;
    const saveTo = path.join(`${__dirname}/uploads`, dateFileName);
    file.pipe(fs.createWriteStream(saveTo));
  });
  bb.on("close", () => {
    console.log(dateFileName);
    readUploadedFile(dateFileName);
    res.writeHead(200, { "Content-Type": "text/plain" });

    res.end(`upload success: ${dateFileName}`);
  });
  req.pipe(bb);
};

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

app.post("/upload", uploadXLSX);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("app running on port", port);
});
