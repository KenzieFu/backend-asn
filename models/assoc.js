const Account = require("./account")
const Category = require("./category")
const ClearedCourse = require("./clearedCourse")
const Course = require("./course")
const SKDAnalysis = require("./skd_analysis")
const SubCategory = require("./subCategory")
const Tryout = require("./tryout")
const TryoutScore = require("./tryoutScore")
const UserTryout = require("./userTryout")


//Relationship between category and sub category
Category.hasMany(SubCategory,{foreignKey:"category_id"})
SubCategory.belongsTo(Category,{foreignKey:"category_id"})

//Relationship between course and subcategory
Course.belongsTo(Category,{foreignKey:"category_id"});
Category.hasMany(Course,{foreignKey:"category_id"});

//Relationship Tryout vs TryoutScore
Tryout.hasMany(TryoutScore,{foreignKey:"tryout_id"});
TryoutScore.belongsTo(Tryout,{foreignKey:"tryout_id"});

//relationshop TryoutScore vs Account
TryoutScore.belongsTo(Account,{foreignKey:"account_id"})
Account.hasMany(TryoutScore,{foreignKey:"account_id"})

//RelationShip Transaction vs Tryout
UserTryout.belongsTo(Tryout,{foreignKey:"tryout_id"})
Tryout.hasMany(UserTryout,{foreignKey:"tryout_id"});

//Relationship Transaction vs Account
UserTryout.belongsTo(Account,{foreignKey:"account_id"});
Account.hasMany(UserTryout,{foreignKey:"account_id"})

//Relationship CompleteCourse v Account 
ClearedCourse.belongsTo(Account,{foreignKey:"account_id"})
Account.hasMany(ClearedCourse,{foreignKey:"account_id"});

//Relationship CompleteCourse v Course
ClearedCourse.belongsTo(Course,{foreignKey:"course_id"});
Course.hasMany(ClearedCourse,{foreignKey:"course_id"})

//SKD analysis
SKDAnalysis.belongsTo(SubCategory,{foreignKey:"subCategory_id"});
SubCategory.hasMany(SKDAnalysis,{foreignKey:"subCategory_id"});


