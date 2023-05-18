const express = require("express");
const verifyCookies = require("../middlewares/verifyCookies");
const { verifyIfAdmin } = require("../middlewares/verifyRole");

const {
  addDepartment,
  addProgram,
} = require("../controllers/adminControllers");

const { getAllPrograms } = require("../controllers/adminDataAccessContollers");

const adminRouter = express.Router();

// data addby admin
adminRouter.post("/addDepartment", addDepartment);
adminRouter.post("/addProgram", addProgram);

// data access by admin
adminRouter.get(
  "/getAllPrograms",
  verifyCookies,
  verifyIfAdmin,
  getAllPrograms
);

module.exports = adminRouter;
