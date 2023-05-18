async function verifyIfFaculty(req, res, next) {
  if (req.role !== "faculty")
    return res.status(403).json({ message: "Forbidden Resources " });
  next();
}

async function verifyIfStudent(req, res, next) {
  if (req.role !== "student")
    return res.status(403).json({ message: "Forbidden Resources " });
  next();
}

async function verifyIfAdmin(req, res, next) {
  if (req.role != "admin")
    return res.status(403).josn({ message: "Forbidden Resources " });
  next();
}

module.exports = { verifyIfFaculty, verifyIfStudent, verifyIfAdmin };
