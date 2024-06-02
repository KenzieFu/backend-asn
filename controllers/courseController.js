const { QueryTypes, where } = require("@sequelize/core");
const sequelize = require("../database/database");
const { uploadFile } = require("../helper/helper");
const Course = require("../models/course");
const fs = require("fs");
const { urlLapis, bucketName } = require("../static");


exports.getCourses = async (req,res,next)=>{
  const {category_id,account_id} = req.params;
  try{
    const courses = await sequelize.query(
      `SELECT 
      c.*,
      (SELECT 
        COUNT(cc.clearedCourse_id) 
        FROM clearedcourse cc 
        WHERE cc.account_id=${account_id}) as isCleared 
      FROM course c 
      WHERE category_id =${category_id} ;`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const filtered = courses.map((course)=>{
      return {
        ...course,
        course_image:`${urlLapis}/${bucketName}/${course.course_image}`
      }
    })
    
    res.status(200).json({
      data:filtered
    })
  }catch(err){
    next(err);
  }
}

//Menampilkan sebuah Course
exports.getCourse = async ( req,res,next)=>{
  const {course_id,account_id} = req.params;
  try{
    const course = await Course.findOne({
      where:{
        course_id:course_id
      }
    });

    if(!course){
      const error = new Error("Not Found");
      error.message = "Course tidak ditemukan";
      error.statusCode = 422;
      return next(error);
    }
    const fetchCourse = await sequelize.query(
      `SELECT 
      c.*,
      (SELECT 
        COUNT(cc.clearedCourse_id) 
        FROM clearedcourse cc 
        WHERE cc.account_id=${account_id}) as isCleared 
      FROM course c 
      WHERE c.course_id = ${course_id} LIMIT 1  ;`,
      {
        type: QueryTypes.SELECT,
      }
    );
    let content = []

    if(fetchCourse[0].course_file){
      const test = await fetch(`${urlLapis}/${bucketName}/${fetchCourse[0].course_file}`)
      console.log(`${urlLapis}/${bucketName}/${fetchCourse[0].course_file}`)
      let data =await test.text();
      data = data.toString().split("\r\n");
      for(i in data){
        content.push(data[i])
      }
    }


    const fetchedCourse = {...fetchCourse[0],
      content:content
    }

    res.status(200).json({
      data:fetchedCourse
    })
  }catch(err){
    next(err);
  }
}

// Menambahkan Course
exports.createCourse = async(req,res,next)=>{
  const {category_id,course_name,course_description} = req.body;
  const file = req.file;
  try{
    if(!file){
      const error = new Error("Validation Error");
      error.message = "Tidak ditemukan sebuah gambar";
      error.statusCode = 422;
      return next(error);
    }
    const pathCourse = `course/${course_name.replaceAll(" ","").toLowerCase()}`;
    const resulter = await uploadFile(file,pathCourse);
    
    const countCourseSequence = await Course.count({
      where:{
        category_id:category_id
      }
    })

    const data={
      category_id,
      course_name,
      course_description,
      course_image:resulter,
      course_queue:countCourseSequence+1
    }

    //Create Course
    const newCourse = await Course.create(data)
    res.status(201).json({
      message:"Berhasil Menambahkan Course Baru"
    })
  }catch(err){
    next(err);
  }
} 

//Menghapus Course 
exports.deleteCourse = async(req,res,next)=>{
  const {course_id} = req.params;
  try{
    const courseDeleted = await Course.destroy({
      where:{
        course_id:course_id
      }
    });
    res.status(200).json({
      message:"Berhasil Menghapus Course"
    })
  }catch(err){
    next(err);
  }
}




// Mengupdate Course 
exports.updateCourse = async(req,res,next)=>{
  const {course_id} = req.params;
  const file = req.file;
  const {category_id,course_name,course_description} = req.body
 let pathName;
  try{

    const course = await Course.findOne({
      where:{
        course_id:course_id
      }
    })
    if(!course){
      const error = new Error("Not Found");
      error.message = "Terjadi Kesalahan Saat Mengubah Course";
      error.statusCode = 422;
      return next(error);
    }
    if(file){
      const pathCourse = `course/${course_name.replaceAll(" ","").toLowerCase()}`;
      console.log("File Exists");
      pathName = await uploadFile(file,pathCourse)
    }
    const data = {
      category_id,
      course_name,
      course_description,
      course_image:file?pathName:course_image
    }
    const updatedCourse =await Course.update(data,{
      where:{
        course_id:course_id
      }
    });

    res.status(200).json({
      message:"Berhasil mengubah Course"
    })
  }catch(err){
    next(err);
  }
}

//Mengubah Urutan Course 
exports.updateCourseQueue =async(req,res,next)=>{
  const {course_id} = req.params;
  const {course_queue} = req.body;
  try{
    const updateQueue = await Course.update({course_queue},{
      where:{
        course_id:course_id
      }
    });
    res.status(200).json({
      message:"Berhasil Mengubah Urutan Course"
    })
  }catch(err){
    next(err);
  }
}

//Memasukan Konten dari Materi
exports.assignCourseContent = async(req,res,next)=>{
  const {course_id} = req.params;
  const file = req.file;
  console.log(file)
  try{
    if(!file){
      const error = new Error("Validation Error");
      error.message = "Tidak ditemukan sebuah file";
      error.statusCode = 422;
      return next(error);
    }
    const course = await Course.findOne({
      where:{
        course_id:course_id
      }
    });
    if(!course){
      const error = new Error("Not Found");
      error.message = "Terjadi Kesalahan Saat Memasukann Materi";
      error.statusCode = 500;
      return next(error);
    }
    const pathCourse = `course/${course.course_name.replaceAll(" ","").toLowerCase()}`;
    const assignContent = await uploadFile(file,pathCourse);
    const updateCourse = await Course.update({course_file:assignContent},{
      where:{
        course_id:course_id
      }
    });

    res.status(200).json({
      message:"Berhasil Memasukan Materi"
    })
  }catch(err){
    next(err);
  }
}