const jwt = require("jsonwebtoken");
const { tokenExp } = require("../static");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Not Authenticate");
    error.statusCode = 401;
    error.message="Belum Terautentikasi"
    return next(error)
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, tokenExp);
  } catch (error) {
    error.statusCode = 401;
    error.message="Belum Terautentikasi"
    return next(error);
  }

  if (!decodedToken) {
    const error = new Error("Not Authenticate");
    error.statusCode = 401;
    error.message="Belum Terautentikasi"
    return next(error);
  }

  req.userId = decodedToken.userId;
  if(decodedToken.role !="ADMIN"){
    const error = new Error("Not Authorize");
    error.statusCode = 401;
    error.message="Tidak diizinkan"
    return next(error);
  }
  next();
};
