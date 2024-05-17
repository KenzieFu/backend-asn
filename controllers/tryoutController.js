const sequelize = require("../database/database");
const { uploadFile } = require("../helper/helper");
const Tryout = require("../models/tryout");
const { urlLapis, bucketName } = require("../static");
const {Storage} = require("@google-cloud/storage")
const _ = require("lodash");
const TryoutScore = require("../models/tryoutScore");
const { QueryTypes } = require("@sequelize/core");

const storage = new Storage();


exports.finishedTryout  = async(req,res,next)=>{
  const {account_id } = req.params;
  try{
    const tryouts = await sequelize.query(
      `SELECT 
      t.*,
      (SELECT 
        COUNT(ts.tryoutScore_id) 
        FROM tryoutscore ts 
        WHERE ts.account_id=${account_id} AND ts.tryout_id=t.tryout_id   LIMIT 1) as isCleared ,
        (SELECT 
          COUNT(ut.userTryout_id) 
          FROM usertryout ut
          WHERE ut.account_id=${account_id} AND ut.tryout_id=t.tryout_id  LIMIT 1) as accessed
      FROM tryout t 
       GROUP BY t.tryout_id  
      HAVING isCleared != 0 ORDER BY t.createdAt DESC ;`,
      {
        type: QueryTypes.SELECT,
      }
    );
  
    res.status(200).json({
      data:tryouts
    })
    
  }catch(err){
    next(err);
  }

}
exports.boughtTryout = async(req,res,next)=>{
  const {account_id } = req.params;
  try{
    const tryouts = await sequelize.query(
      `SELECT 
      t.*,
      (SELECT 
        COUNT(ts.tryoutScore_id) 
        FROM tryoutscore ts 
        WHERE ts.account_id=${account_id}  LIMIT 1) as isCleared ,
        (SELECT 
          COUNT(ut.userTryout_id) 
          FROM usertryout ut
          WHERE ut.account_id=${account_id} AND ut.tryout_id=t.tryout_id  LIMIT 1) as accessed
      FROM tryout t  GROUP BY t.tryout_id  
      HAVING isCleared != 0 ORDER BY t.createdAt DESC ;`,
      {
        type: QueryTypes.SELECT,
      }
    );
  
    res.status(200).json({
      data:tryouts
    })
    
  }catch(err){
    next(err);
  }
}

exports.getTryouts = async (req,res,next)=>{
  const {account_id } = req.params;
  try{
    const tryouts = await sequelize.query(
      `SELECT 
      t.*,
      (SELECT 
        COUNT(ts.tryoutScore_id) 
        FROM tryoutscore ts 
        WHERE ts.account_id=${account_id}  LIMIT 1) as isCleared ,
        (SELECT 
          COUNT(ut.userTryout_id) 
          FROM usertryout ut
          WHERE ut.account_id=${account_id} AND ut.tryout_id=t.tryout_id  LIMIT 1) as accessed
      FROM tryout t ORDER BY t.createdAt DESC ;`,
      {
      
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({
      data:tryouts
    })
    
  }catch(err){
    next(err);
  }
}

exports.getTryout = async(req,res,next)=>{
  const {tryout_id,account_id} = req.params;
  try{
    const tryout = await sequelize.query(
      `SELECT 
      t.*,
      (SELECT 
        COUNT(ts.tryoutScore_id) 
        FROM tryoutscore ts 
        WHERE ts.account_id=${account_id}  LIMIT 1) as isCleared ,
        (SELECT 
          COUNT(ut.userTryout_id) 
          FROM usertryout ut
          WHERE ut.account_id=${account_id} AND ut.tryout_id=${tryout_id}  LIMIT 1) as accessed
      FROM tryout t WHERE t.tryout_id=${tryout_id} ;`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if(!tryout[0]){
      const error = new Error("Not Found");
      error.statusCode = 404;
      error.message = "Tryout Tidak ditemukan"
      return next(error);
    }
    res.status(200).json({
      data:tryout[0]
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
    console.log(`${urlLapis}/${bucketName}/${tryout.tryout_file}`)
    const datafile = await filejson.json()
    

    const twk = datafile.filter((data)=>data.category ==="TWK");
    const tiu = datafile.filter((data)=>data.category ==="TIU");
    const tkp = datafile.filter((data)=>data.category ==="TKP");

    const randomTIU =_.shuffle(tiu);
    const randomTWK =_.shuffle(twk);
    const randomTKP =_.shuffle(tkp);

    const finalQuiz = [
      ...randomTIU,
      ...randomTWK,
      ...randomTKP
    ]
  const newTo={
    tryout_id:tryout.tryout_id,
    tryout_title:tryout.tryout_title,
    tryout_duration:tryout.tryout_duration,
    tryout_total:tryout.tryout_total,
    tryout_content:finalQuiz
  }
    
    if(isFiles && finalQuiz)
      {
        res.status(200).json({
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

//Create Tryout
exports.createTryout = async (req,res,next)=>{
  const {
    tryout_title,
    tryout_duration,
    tryout_status,
    tryout_type,
    tryout_price,
    tryout_total,
    tryout_closed
  }=req.body
  const file = req.file
  try{
      if(!file){
        const error = new Error("Validation Error");
        error.message = "Tidak ditemukan sebuah file";
        error.statusCode = 422;
        return next(error);
      }
      let date = new Date();
      date.setDate(date.getDate()+14);
    let ToUnknown= tryout_closed?tryout_closed:date
      const pathCourse = `tryout/${tryout_title.replaceAll(" ","").toLowerCase()}`;
    const resulter = await uploadFile(file,pathCourse);

    const data = {
      tryout_title,
      tryout_file:resulter,
      tryout_duration:tryout_duration,
      tryout_status:tryout_status?tryout_status:"DISABLE",
      tryout_type:tryout_type?tryout_type:"FREE",
      tryout_price:tryout_price??10000,
      tryout_total:tryout_total,
      tryout_closed:ToUnknown
    }

    const newTO = await Tryout.create(data);
    res.status(200).json({
      message:"Berhasil Membuat TO baru"
    })
    
  }catch(err){
    next(err);
  }
}

//Delete Tryout
exports.deleteTryout = async(req,res,next)=>{
  const {tryout_id} = req.params;
  try{
    const deletedTryout = await Tryout.destroy({
      where:{
        tryout_id:tryout_id
      }
    });
    res.status(200).json({
      message:"Berhasil Menghapus sebuah TO"
    })
  }catch(err){
    next(err);
  }
}

// Mengubah Tryout
exports.changeTryout = async(req,res,next)=>{
  const {tryout_id} = req.params;
  const {
    tryout_title,
    tryout_duration,
    tryout_status,
    tryout_type,
    tryout_price,
    tryout_closed
  }=req.body
  try{
      
      let date = new Date(tryout_closed);
      let link;
      if(file){
        const pathCourse = `tryout/${tryout_title.replaceAll(" ","").toLowerCase()}`;
      const resulter = await uploadFile(file,pathCourse);
        link = resulter;
      }
    const data = {
      tryout_title,
      tryout_duration:tryout_duration,
      tryout_status:tryout_status,
      tryout_type:tryout_type,
      tryout_price:tryout_price,
      tryout_closed:date
    }

    if(file){
      data.tryout_file = link;
    }
    const updatedTo = await Tryout.update(data,{
      where:{
        tryout_id
      }
    });

    res.status(200).json({
      message:"Berhasil Memperbaharui TO "
    })
    
  }catch(err){
    next(err);
  }
}

//get leaderboard
exports.leaderBoardTryout = async (req,res,next)=>{
  const {tryout_id } = req.params;
  try{
    const tryoutStandings = await TryoutScore.findAll({
      where:{
        tryout_id:tryout_id
      }
    });

  

    res.status(200).json({
      data:tryoutStandings
    })

  }catch(err){
    next(err);
  }
}

exports.checkTryoutStats =async(req,res,next)=>{
  const { tryout_id,account_id} = req.params;
  try{
    const tryoutStats = await TryoutScore.findOne({
      where:{
        [Op.and]:{
          tryout_id:tryout_id,
          account_id:account_id
        }
      }
    });

    if(!tryoutStats){
      const error =new Error("Not Found");
      error.statusCode =404;
      error.message="Score anda tidak ditemukan";
      return next(err);
    }

    res.status(200).json({
      data:tryoutStats
    })
  }catch(err){
    next(err);
  }
}