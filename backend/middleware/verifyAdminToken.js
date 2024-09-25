const jwt = require("jsonwebtoken");

function verifyAdminToken(req, res, next) {
  try {
    const adminToken = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
    // Assign decoded payload to req.user
    req.admin = decoded;
    // Call next() to invoke the next middleware function
    next();
  } catch (error) {
    // If any errors, send back a 401 status and an 'Invalid token.' error message
    res.status(401).json({ error: "Invalid authorization token." });
  }
}

module.exports = verifyAdminToken;


