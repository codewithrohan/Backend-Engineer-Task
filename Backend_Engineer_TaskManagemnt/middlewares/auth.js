const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

const SECRET_KEY = "Rojo@9116475806";

const authMiddleware = async (req, res, next) => {
  const token =
    req.headers.authorization &&                            //extracting the jwt token
    req.headers.authorization.replace("Bearer ", "");

  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const decoded = jwt.verify(token, SECRET_KEY);

 
    const user = await User.findById(decoded.userId);         // retrieving the user from database and checking if it exists 

    if (!user) {
      throw new Error("User not found");
    }

    req.user = decoded;                // setting req.user to decoded payload     
    next();

  } catch (error) {
    console.error("Error:", error);
    res.status(401).json({ error: "Authentication failed " + error.message });
  }
};

module.exports = authMiddleware;




