const express = require("express");
const router= express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

//Login Controller 
router.post("/login",authController.login);

//Logout Controller
router.post("/logout",auth,authController.logout);

module.exports = router;