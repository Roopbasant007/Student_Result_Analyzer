async function verifyIfFaculty(req, res, next) {
  if (req.user.role !== "faculty")
    return res.status(403).json({ message: "Forbidden Resources " });
  next();
}

async function verifyIfStudent(req, res, next) {
  if (req.user.role !== "student")
    return res.status(403).json({ message: "Forbidden Resources " });
}

module.exports = { verifyIfFaculty, verifyIfStudent };
