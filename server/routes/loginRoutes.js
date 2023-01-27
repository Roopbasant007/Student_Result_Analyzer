const express = require("express");
const {
  loginStudent,
  loginFaculty,
  loginAdmin,
} = require("../controllers/loginControllers");

const loginRouter = express.Router();

//Login Route Handlers
loginRouter.post("/student", loginStudent);
loginRouter.post("/faculty", loginFaculty);
loginRouter.post("/admin", loginAdmin);

module.exports = loginRouter;
