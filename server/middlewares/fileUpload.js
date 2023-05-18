const multer = require("multer");
const path = require("path");

const fileUpload = multer({
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

module.exports = fileUpload;
