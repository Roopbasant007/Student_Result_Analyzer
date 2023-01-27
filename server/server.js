require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDB = require("./config/dbConn.js");

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// database connection
connectToDB();

// routers for routing APIs

const registerRouter = require("./routes/registerRoutes");
const loginRouter = require("./routes/loginRoutes");
const adminRouter = require("./routes/adminRoutes");
const facultyRouter = require("./routes/facultyRoutes");

// Configuration middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Custom Middlewares

const verifyJWT = require("./middlewares/veifyJWT");
const {
  verifyIfFaculty,
  verifyIfStudent,
} = require("./middlewares/verifyRole");

// API Routes

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/admin", adminRouter);
app.use("/api/faculty", facultyRouter);

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
