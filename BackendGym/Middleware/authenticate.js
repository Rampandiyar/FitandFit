import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY;

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { authenticateUser };
