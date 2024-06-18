const { where } = require("@sequelize/core");
const Category = require("../models/category");
const LATSOL = require("../models/latsol");
const Tryout = require("../models/tryout");
const { urlLapis, bucketName } = require("../static");
const _ = require("lodash");
const { uploadFILE } = require("../helper/helper");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage();

exports.createLatsol = async (req, res, next) => {
  const { category_id, lat_desc, jumlah_soal,waktu} = req.body;
  const lat_thumb = req.files.lat_thumb[0];
  const lat_file = req.files.lat_file[0];
  try {
    if (!lat_thumb) {
      const error = new Error("Validation Error");
      error.message = "Tidak ditemukan sebuah file";
      error.statusCode = 422;
      return next(error);
    }
    if (!lat_file) {
      const error = new Error("Validation Error");
      error.message = "Tidak ditemukan sebuah file";
      error.statusCode = 422;
      return next(error);
    }

    const pathCourse = `latsol`;
    const resulter1 = await uploadFILE(lat_thumb, pathCourse);
    const resulter2 = await uploadFILE(lat_file, pathCourse);

    const createLat = await LATSOL.create({
      category_id,
      lat_desc,
      waktu,
      jumlah_soal,
      lat_thumb:resulter1,
      lat_file: resulter2,
    });

    return res.status(201).json({
      message:"Berhasil Membuat Latsol"
    })
  } catch (err) {
    next(err);
  }
};

exports.editLatsol = async (req, res, next) => {
  const { latsol_id } = req.params;
  const { category_id, lat_desc, jumlah_soal, waktu } = req.body;
  const lat_thumb = req.files.lat_thumb[0];
  const lat_file = req.files.lat_file[0];

  try {
    const data = {
      category_id,
      lat_desc,
      jumlah_soal,
      waktu,
    };
    if (lat_thumb) {
      console.log("uplod file");
      const pathCourse = `latsol`;
      const resulter = await uploadFILE(lat_thumb, pathCourse);
      data.lat_thumb = resulter
    }
    if(lat_file){
      console.log("uplod file");
      const pathCourse = `latsol`;
      const resulter = await uploadFILE(lat_thumb, pathCourse);
      data.lat_file = resulter
    }
    const update = await LATSOL.update(
      data,
      {
        where: {
          latsol_id: latsol_id,
        },
      }
    );
    return res.status(200).json({
      message:"Berhasil Mengedit Latsol"
    })
  } catch (err) {
    next(err);
  }
};

exports.deleteLatsol = async(req,res,next)=>{
  const { latsol_id} = req.params;
  try{
      const deleteLat = await LATSOL.delete({
        where:{
          latsol_id:latsol_id
        }
      });
      return res.status(200).json({
        message:"Berhasil Menghapus latsol"
      })
  }catch(err){
    next(err);
  }
}

exports.startLatsol = async(req,res,next)=>{
  const {latsol_id} = req.params;
  try{

    const lat = await LATSOL.findOne({
      where:{
        latsol_id:latsol_id
      },
      include:[
        {model:Category}
      ],
    },
    
  );
  const isFiles =  storage.bucket(bucketName).file(lat.lat_file);
  const filejson =await fetch(`${urlLapis}/${bucketName}/${lat.lat_file}`)

  const datafile = await filejson.json()
  const shuffleData = _.shuffle(datafile)
  const splitDir = lat.lat_file.split("/");
  const dataformated = shuffleData.map(da=>{
    // 1. Remove single quotes and square brackets
const cleanedString = da.option.substring(1, da.option.length - 1); 
// Now: "x', 'x', 'x', 'x', 'x"

// 2. Split the string by comma and trim whitespace
const optionArray = cleanedString.replace(/'/g, '').split(',').map(item => item.trim()); 
   
  
   const imagePath = `${urlLapis}/${bucketName}/${splitDir[0]}/images`
   if(da.category ==3){
     return{
       ...da,
       question_image:da.question_image?`${imagePath}/${da.question_image}`:null,
       option:optionArray,
       jawaban_tkp:JSON.parse(da.jawaban_tkp)
     }
   }
     else{
       return{
         ...da,
         question_image:da.question_image?`${imagePath}/${da.question_image}`:null,
         option:optionArray,

       }
     }
   
  
 })
  const mudah = dataformated.filter((data)=>data.handicap == 1);
  const sedang = dataformated.filter((data)=>data.handicap ==2);
  const susah = dataformated.filter((data)=>data.handicap==3);


  const finalFormated = [
    mudah.slice(0,10),
    sedang.slice(0,10),
    susah.slice(0,10)
  ]
    const data ={
      lastol_id:lat.lastol_id,
      category:lat.category,
    
      lat_desc:lat.lat_desc,
      jumlah_soal:lat.jumlah_soal,
      waktu:lat.waktu,
      lat_thumb:`${urlLapis}/${bucketName}/${lat.lat_thumb}`,
      lat_file: `${urlLapis}/${bucketName}/${lat.lat_file}`,
      lat_content:finalFormated

    }

    return res.status(200).json({
      data:data
    })
  }catch(err){
    next(err)
  }
}


exports.fetchOneLatsol = async(req,res,next)=>{
  const {latsol_id} = req.params;
  try{

    const lat = await LATSOL.findOne({
      where:{
        latsol_id:latsol_id
      },
      include:[
        {model:Category}
      ],
    },
    
  );

    const data ={
      latsol_id:lat.latsol_id,
      category:lat.category,
    
      lat_desc:lat.lat_desc,
      jumlah_soal:lat.jumlah_soal,
      waktu:lat.waktu,
      lat_thumb:`${urlLapis}/${bucketName}/${lat.lat_thumb}`,
      lat_file: `${urlLapis}/${bucketName}/${lat.lat_file}`,

    }

    return res.status(200).json({
      data:data
    })
  }catch(err){
    next(err)
  }
}


exports.fetchAllLatsol = async(req,res,next)=>{

  try{
    const findAll = await LATSOL.findAll({
      include:[
        {model:Category}
      ],
    });
    let content =findAll.map((lat)=>{
      console.log(lat)
      return{
        latsol_id:lat.latsol_id,
        category:lat.category,
        lat_desc:lat.lat_desc,
        jumlah_soal:lat.jumlah_soal,
        waktu:lat.waktu,
        lat_thumb:`${urlLapis}/${bucketName}/${lat.lat_thumb}`,
        lat_file: `${urlLapis}/${bucketName}/${lat.lat_file}`
        
      }
    });

    return res.status(200).json({
      data:content
    })
  }catch(err){
    next(err);
  }
}


exports.getQuiz = async(req,res,next)=>{
  const {tryout_id} = req.params;
  try{
    
    const tryout = await Tryout.findByPk(tryout_id);
    
    const isFiles =  storage.bucket(bucketName).file(tryout.tryout_file);
    const filejson =await fetch(`${urlLapis}/${bucketName}/${tryout.tryout_file}`)

    const datafile = await filejson.json()
    

    const twk = datafile.filter((data)=>data.category ==1);
    const tiu = datafile.filter((data)=>data.category ==2);
    const tkp = datafile.filter((data)=>data.category ==3);

    // const randomTIU =_.shuffle(tiu);
    // const randomTWK =_.shuffle(twk);
    // const randomTKP =_.shuffle(tkp);

    const finalQuiz = [
      ...tiu,
      ...twk,
      ...tkp
    ]
    const dataformated = finalQuiz.map(da=>{
       // 1. Remove single quotes and square brackets
  const cleanedString = da.option.substring(1, da.option.length - 1); 
  // Now: "x', 'x', 'x', 'x', 'x"

  // 2. Split the string by comma and trim whitespace
  const optionArray = cleanedString.replace(/'/g, '').split(',').map(item => item.trim()); 
      const splitDir = tryout.tryout_file.split("/");
      console.log(splitDir)
      const imagePath = `${urlLapis}/${bucketName}/${splitDir[0]}/${splitDir[1]}/images`
      if(da.category ==3){
        return{
          ...da,
          question_image:da.question_image?`${imagePath}/${da.question_image}`:null,
          option:optionArray,
          jawaban_tkp:JSON.parse(da.jawaban_tkp)
        }
      }
        else{
          return{
            ...da,
            question_image:da.question_image?`${imagePath}/${da.question_image}`:null,
            option:optionArray,
  
          }
        }
      
     
    })
  const newTo={
    tryout_id:tryout.tryout_id,
    tryout_title:tryout.tryout_title,
    tryout_duration:tryout.tryout_duration,
    tryout_total:tryout.tryout_total,
    tryout_content:dataformated
  }
    
    if(isFiles && finalQuiz)
      {
        return res.status(200).json({
          data:newTo
        })
      }
    else{
      const error = new Error("Not Found");
      error.statusCode = 404;
      error.message = "Tryout Kosong"
      return next(error);
    }
   
    
  }catch(err){
    next(err);
  }
}