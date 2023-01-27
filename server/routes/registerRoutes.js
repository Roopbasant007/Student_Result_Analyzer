const express = require("express");

const {
  registerStudent,
  registerFaculty,
  registerAdmin,
} = require("../controllers/registerControllers");

const registerRouter = express.Router();

// Registration router Handlers
registerRouter.post("/student", registerStudent);
registerRouter.post("/faculty", registerFaculty);
registerRouter.post("/admin", registerAdmin);

module.exports = registerRouter;
