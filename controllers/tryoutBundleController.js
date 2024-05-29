const { uploadFile } = require("../helper/helper");
const TryoutBundle = require("../models/tryout_bundle");


// exports.fetchBundle = async(req,res,next)=>{
//   try{
//     const bundle = await 
//   }catch(err){
//     next(err);
//   }
  
// }

exports.createTryoutBundle  =async(req,res,next)=>{

  // listTryout = [1,2,3,4]
  //descList  =["nskladals","ksahklasd","kahsdahsdlha"]
  const {
    listTryout,
    price,
    tryoutBundle_name,
    description,
    descList 
  } = req.body

  try{

    // make array to string split to ,

    const splitted = listTryout.join(",");
    const splitDesLis = descList.join(",");

    const data ={
      listTryout:splitted,
      price:price,
      tryoutBundle_name:tryoutBundle_name,
      description,
      descList:splitDesLis,
    }
  //create new bundle 
  const newBundle = await TryoutBundle.create(data);
  return res.status(200).json({
    message:"Berhasil menambahkan bundle baru"
  })


  }catch(err){
    next(err);
  }
}

