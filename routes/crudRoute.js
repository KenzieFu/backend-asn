const express = require("express");
const router= express.Router();
const accountController = require("../controllers/accountController");
const categoryController = require("../controllers/category");
const subCategoryController = require("../controllers/subcategoryController");
const courseController = require("../controllers/courseController")
const clearedCourseController = require("../controllers/clearedCourseControllerr")
const tryoutController = require("../controllers/tryoutController");
const generateRandomToken = require("../controllers/generateRandomToken");
const { registerValidator } = require("../validator/rules");
const bundleController = require("../controllers/tryoutBundleController");
const transController = require("../controllers/transaction");
const tryoutScoreController =require("../controllers/tryoutScoreController");
const notifikasiController = require("../controllers/notifikasiController");
const latsolController = require("../controllers/latsolController")
const historyLatController = require("../controllers/finishedLatsol")
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
// ACCOUNT
//create account
router.post("/accounts",registerValidator,accountController.createAccount);


//delete account
router.delete("/accounts/:account_id",admin,accountController.deleteAccount);


// Category
// create category
router.post("/categories",admin,categoryController.createCategory);

//update category
router.put("/categories/:category_id",admin,categoryController.updateCategory);

// delete category
router.delete("/categories/:category_id",admin,categoryController.deleteCategory);

// Sub Category
// create sub Category
router.post("/subCategories",admin,subCategoryController.createSubcategory);

//update sub category
router.put("/subCategories/:subCategory_id",admin,subCategoryController.updateSubCategory);

//delete sub category
router.delete("/subCategories/:subCategory_id",admin,subCategoryController.deleteSubCategory);

//Course
// create course 


// delete course 
router.delete("/courses/:course_id",admin,courseController.deleteCourse);

//update course
router.put("/courses/:course_id",admin,courseController.updateCourse);

// update course queue
router.put("/courses/queue/:course_id",admin,courseController.updateCourseQueue);

// assign course content



//ClearedCourse
// add clearedCourse
router.post("/clearedCourse/:account_id/:course_id",auth,clearedCourseController.finishedCourse);

//Tryout
//create tryout


// delete tryout
router.delete("/tryouts/:tryout_id",admin,tryoutController.deleteTryout);

// //update tryout
router.put("/tryouts/:tryout_id",admin,tryoutController.changeTryout)

//Tryout Score
//cleared a tryout

router.post("/tryouts/cleared/:tryout_id/:account_id",auth,tryoutScoreController.tryoutFinished);

//Random Token 
router.post("/tokens/create",admin,generateRandomToken.createRandomToken);

//redeem token
router.post("/redeem/:account_id",auth,generateRandomToken.redeemToken);


//create bundle
router.post("/bundle",admin,bundleController.createTryoutBundle);

//create notifikasi
router.post("/notification/:account_id",admin, notifikasiController.createNotif);


// admin update status Transaksi
//byk validasi
// req.params = transactionRecord_id 
//req.body =  transaction_status
router.put("/updateTransaction/:transactionRecord_id",admin,transController.updateTransaksi);


//Notifikasi
router.put("/updateNotif/:account_id/:notifikasi_id",auth,notifikasiController.clickedNotif)


//latsol finished latsol
router.post("/latsol/:latsol_id/account/:account_id",historyLatController.clearLatsol);


module.exports = router;