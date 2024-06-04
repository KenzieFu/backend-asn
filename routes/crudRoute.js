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
const transController = require("../controllers/transaction")
const tryoutScoreController =require("../controllers/tryoutScoreController")
// ACCOUNT
//create account
router.post("/accounts",registerValidator,accountController.createAccount);


//delete account
router.delete("/accounts/:account_id",accountController.deleteAccount);

//update account
router.put("/accounts/:account_id",accountController.updateAccount);

// Category
// create category
router.post("/categories",categoryController.createCategory);

//update category
router.put("/categories/:category_id",categoryController.updateCategory);

// delete category
router.delete("/categories/:category_id",categoryController.deleteCategory);

// Sub Category
// create sub Category
router.post("/subCategories",subCategoryController.createSubcategory);

//update sub category
router.put("/subCategories/:subCategory_id",subCategoryController.updateSubCategory);

//delete sub category
router.delete("/subCategories/:subCategory_id",subCategoryController.deleteSubCategory);

//Course
// create course 


// delete course 
router.delete("/courses/:course_id",courseController.deleteCourse);

//update course
router.put("/courses/:course_id",courseController.updateCourse);

// update course queue
router.put("/courses/queue/:course_id",courseController.updateCourseQueue);

// assign course content



//ClearedCourse
// add clearedCourse
router.post("/clearedCourse/:account_id/:course_id",clearedCourseController.finishedCourse);

//Tryout
//create tryout


// delete tryout
router.delete("/tryouts/:tryout_id",tryoutController.deleteTryout);

// //update tryout
router.put("/tryouts/:tryout_id",tryoutController.changeTryout)

//Tryout Score
//cleared a tryout

router.post("/tryouts/cleared/:tryout_id/:account_id",tryoutScoreController.tryoutFinished);

//Random Token 
router.post("/tokens/create",generateRandomToken.createRandomToken);

//redeem token
router.post("/redeem/:account_id",generateRandomToken.redeemToken);


//create bundle
router.post("/bundle",bundleController.createTryoutBundle)


// admin update status Transaksi
//byk validasi
// req.params = transactionRecord_id 
//req.body =  transaction_status
router.put("/updateTransaction/:transactionRecord_id",transController.updateTransaksi);


module.exports = router;