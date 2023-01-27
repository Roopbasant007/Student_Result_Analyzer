const jwt = require("jsonwebtoken");
async function verifyJWT(req, res, next) {
  try {
    let token = req.headers["Authorization"]?.split(" ")[1];
    if (!token) token = req.headers["auhtorization"]?.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "Requires Access Tokens" });
    jwt.verify(token, process.env.JSON_TOKEN_SECRET, (error, decoded) => {
      if (error)
        return res.status(401).json({ message: "User Authentication failed" });
      req.user = {
        id: decoded.id,
        role: decoded.role,
      };
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error " });
  }
}

module.exports = verifyJWT;
