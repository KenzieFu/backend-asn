const express = require("express");
const router= express.Router();
const authController = require("../controllers/authController");

//Login Controller 
router.post("/login",authController.login);

//Logout Controller
router.post("/logout",authController.logout);

module.exports = router;