const express = require("express");
const router = express.Router()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user_model");

const SECRET_KEY = "Rojo@9116475806";

router.get("/register", (req, res) => {
    res.render("register");
  });


// User registration route
router.post("/register", async (req, res) => {
    try {
      const { phone_number, password } = req.body;  
  
      const existingUser = await User.findOne({ phone_number });      
  
      if (existingUser) {
        return res.render("register", { message: "User already exists" });      // to check user with same phone number   
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        phone_number,
        password: hashedPassword,
      });
  
      const savedUser = await newUser.save();
  
      return res.render("login", { message: "User registered successfully" });
  
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ error: "Error registering user" });
    }
  });
  
  // User login route
  router.post("/login", async (req, res) => {
    try {
      const { phone_number, password } = req.body;
  
      const user = await User.findOne({ phone_number });
  
      if (!user) {
        return res.render("login", { message: "Invalid phone number or password" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.render("login", { message: "Invalid phone number or password" });
      }
  
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, {     
        expiresIn: "1h",                      // jwt token expires in 1hr
      });
  
      return res.render("dashboard", { message: "Login successful", token });
      
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ error: "Error logging in" });
    }
  });
  
  
    router.get('/login',(req,res)=>{
    res.render('login')
    })



  module.exports = router;