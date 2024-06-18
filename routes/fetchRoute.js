const express = require("express");
const router= express.Router();
const accountController = require("../controllers/accountController");
const categoryController = require("../controllers/category");
const subCategoryController = require("../controllers/subcategoryController");
const courseController = require("../controllers/courseController");
const tryoutController = require("../controllers/tryoutController");
const tryoutBundleController = require("../controllers/tryoutBundleController")
const transController = require("../controllers/transaction")
const notifController =require("../controllers/notifikasiController");
const latsolController = require("../controllers/latsolController")
const historyLatController = require("../controllers/finishedLatsol")
const auth = require("../middleware/auth");
//Account
// get all accounts


router.get("/accounts",auth,accountController.getAccounts);

//get account
router.get("/accounts/:account_id",auth,accountController.getAccount);

//Category
//get all category
router.get("/categories",auth,categoryController.getCategories);

//get category
router.get("/categories/:category_id",auth,categoryController.getCategory);

//Sub category
//get all sub category
router.get("/subCategories",auth,subCategoryController.getSubCategories);

//get sub category
router.get("/subCategories/:subCategory_id",auth,subCategoryController.getSubCategory);

//Course
// get all courses
router.get("/courses/account/:account_id/category/:category_id",auth,courseController.getCourses);

//get course
router.get("/courses/:course_id/account/:account_id",auth,courseController.getCourse);


//Tryout
//get Tryouts
router.get("/tryouts/account/:account_id",auth,tryoutController.getTryouts);

router.get("/tryouts/newest",auth,tryoutController.getNewestTryout); 
//get tryout detail
router.get("/tryouts/:tryout_id/account/:account_id",auth,tryoutController.getTryout);

//get startTryout
router.get("/tryouts/:tryout_id/start",auth,tryoutController.getQuiz);

//tryout pembahasan
router.get("/tryouts/:tryout_id/pembahasan",auth,tryoutController.getQuiz);

//get finished Tryout
router.get("/tryouts/finished/:account_id",auth,tryoutController.finishedTryout);

//get bought tryout
router.get("/tryouts/bought/:account_id",auth,tryoutController.boughtTryout);

//get free to
router.get("/freeTryouts/account/:account_id",auth,tryoutController.freeTO);

//get pay to
router.get("/payTryouts/account/:account_id",auth,tryoutController.paidTO);


//get leaderboard
router.get("/leaderboard/:tryout_id",auth,tryoutController.leaderBoardTryout);

// get tryout recap
router.get("/tryouts/stats/:tryout_id/:account_id",auth,tryoutController.checkTryoutStats);

//get bundle list
router.get("/tryoutbundles/account/:account_id",auth,tryoutBundleController.fetchTryoutBundle);

//get detail bundle
router.get("/tryoutbundles/account/:account_id/detail/:tryoutBundle_id",auth,tryoutBundleController.fetchOneTryoutBundle);

//fetch history transaction
// req.params account_id 
// body none
router.get("/transaction/history/:account_id",auth,transController.historyTransaksi);


//ambil notifikasi user
router.get("/notifikasi/:account_id",auth,notifController.fetchNotif);

//user melihat daftar latsol
router.get("/latsol",latsolController.fetchAllLatsol);

//user meliat detail latsol
router.get("/latsol/:latsol_id",latsolController.fetchOneLatsol);

//start latsol
router.get("/latsol/:latsol_id/start",latsolController.startLatsol);

//list history latsol
router.get("/latsol/:latsol_id/account/:account_id",historyLatController.fetchHistoryLatsol)

// detail history latsol
router.get("/historyLat/:historyLat_id/account/:account_id",historyLatController.fetchDetailLatsol)

module.exports=router