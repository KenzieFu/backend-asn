const { where } = require("@sequelize/core");
const Account = require("../models/account");
const Course = require("../models/course");
const ClearedCourse = require("../models/clearedCourse");

exports.finishedCourse=  async(req,res,next)=>{
  const {account_id,course_id} = req.params;
  try{
    const account = await Account.findOne({
      where:{
        account_id:account_id
      }
    });
    if(!account){
      const error = new Error("Not Found");
      error.statusCode = 404
      error.message="Akun tidak ditemukan"
      return next(error);
    }

    const course = await Course.findOne({
      where:{
        course_id:course_id
      }
    });
    if(!course){
      const error = new Error("Not Found");
      error.statusCode = 404
      error.message="Course tidak ditemukan"
      return next(error)
    }
    const cleared = await ClearedCourse.create({
      account_id:account_id,
      course_id:course_id
    })
    
    return res.status(200).json({
      message:"Berhasil Menyelesaikan sebuah Course"
    })
  }catch(err){
    next(err);
  }
}