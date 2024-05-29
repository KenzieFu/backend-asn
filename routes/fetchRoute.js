const express = require("express");
const router= express.Router();
const accountController = require("../controllers/accountController");
const categoryController = require("../controllers/category");
const subCategoryController = require("../controllers/subcategoryController");
const courseController = require("../controllers/courseController");
const tryoutController = require("../controllers/tryoutController");

//Account
// get all accounts
router.get("/accounts",accountController.getAccounts);

//get account
router.get("/accounts/:account_id",accountController.getAccount);

//Category
//get all category
router.get("/categories",categoryController.getCategories);

//get category
router.get("/categories/:category_id",categoryController.getCategory);

//Sub category
//get all sub category
router.get("/subCategories",subCategoryController.getSubCategories);

//get sub category
router.get("/subCategories/:subCategory_id",subCategoryController.getSubCategory);

//Course
// get all courses
router.get("/courses/account/:account_id/category/:category_id",courseController.getCourses);

//get course
router.get("/courses/:course_id/account/:account_id",courseController.getCourse);


//Tryout
//get Tryouts
router.get("/tryouts/account/:account_id",tryoutController.getTryouts);

router.get("/tryouts/newest",tryoutController.getNewestTryout); 
//get tryout detail
router.get("/tryouts/:tryout_id/account/:account_id",tryoutController.getTryout);

//get startTryout
router.get("/tryouts/:tryout_id/start",tryoutController.getQuiz);

//get finished Tryout
router.get("/tryouts/finished/:account_id",tryoutController.finishedTryout);

//get bought tryout
router.get("/tryouts/bought/:account_id",tryoutController.boughtTryout);

//get free to
router.get("/tryouts/free/account/:account_id",tryoutController.freeTO);

//get pay to
router.get("/tryouts/pay/account/:account_id",tryoutController.paidTO);


//get leaderboard
router.get("/leaderboard/:tryout_id",tryoutController.leaderBoardTryout);

// get tryout recap
router.get("/tryouts/stats/:tryout_id/:account_id",tryoutController.checkTryoutStats);





module.exports=router