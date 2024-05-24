const bcryptjs = require("bcryptjs")
const Accounts = require("../models/account");
const { where } = require("@sequelize/core");
const Account = require("../models/account");
const { uploadProfile } = require("../helper/helper");
const { validationResult } = require("express-validator");



// Create Account 
exports.createAccount = async (req,res,next)=>{

  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation Error");
        error.statusCode = 500

        error.message=errors.array()[0].msg;
        return next(error); 
    }
    const {
      email,
      password,
      name,
    } = req.body;
    console.log(email)
    const checkEmail = await Account.count({
      where:{
        email:email
      }
    })
    if(checkEmail>=1){
      const error = new Error("Validation Error");
      error.statusCode=500;
      error.message="Email sudah terdaftar"
      return next(error)
    }
    const randomUsername = Math.floor(100+Math.random()*(999-100))
    const username= `${name.toLowerCase().trim()}_${randomUsername}`
    const hashed = await bcryptjs.hash(password,12);

    const data = {
      email:email,
      username:username,
      name:name,
      password:hashed
    }
    

    const createdAccount = await Accounts.create(data);
    console.log("Berhasil Membuat Akun Baru");
    res.status(201).json({
      message:"Berhasil Membuat Akun Baru"
    })

    

  }catch(err){
    next(err);
  }

}

//Delete Account
exports.deleteAccount = async (req,res,next)=>{
  try{
    const {account_id} = req.params;
    
    const account = await Accounts.destroy({
      where:{
        account_id:accountId
      }
    })
   res.status(200).json({
    message:"Berhasil Menghapus Akun"
   })

  }catch(err){
    next(err);
  }

}

// Mengambil Semua Akun
exports.getAccounts=async (req,res,next)=>{
  try{
    const accounts =await Accounts.findAll();
    res.status(200).json({
      data:accounts
    })

  }catch(err){
    next(err)
  }
}

// Mengambil satu Akun
exports.getAccount =async (req,res,next)=>{
  const {account_id} = req.params;
  try{
    const account =await Accounts.findByPk(account_id);
    if(!account){
      const error = new Error("Not Found");
      error.statusCode = 404;
      error.message = "Akun tidak ditemukan"
      return next(error);

    }
    res.status(200).json({
      data:account
    });
  }catch(err){
    
    next(err);
  }
}

//mengupdate Avatar
exports.updateAvatar = async(req,res,next)=>{
  const{account_id} = req.params;
  const file = req.file;

  if (!file){
    const error = new Error("Failed");
    error.statusCode = 500;
    error.message="File tidak ditemukan"
    next(error);

  }
  const uploadAv = await uploadProfile(file);
  if(uploadAv ===""){
    const error = new Error("Failed");
    error.statusCode = 500;
    error.message="File gagal untuk diupload"
    next(error);
  }
  const updateAccount = await Account.update({avatar:uploadAv},{where:{account_id:account_id}});
  return res.status(200).json({
    message:"Berhasil mengubah Avatar"
  })
}

// Mengupdate akun
exports.updateAccount = async ( req,res,next) =>{
  const {account_id} = req.params;
  const {
    name,
    username,
    email,
   } = req.body

   try{

   
   const data = {
    name,username,email
   }

   const updateAcc = await Accounts.update(data,{
    where:{
      account_id:account_id
    }
   });

   res.status(200).json({
    message:"Berhasil mengubah akun"
   })
  }catch(err){
    next(err)
  }
}

