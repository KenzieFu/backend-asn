const bcryptjs = require("bcryptjs")
const Accounts = require("../models/account");
const { where } = require("@sequelize/core");



// Create Account 
exports.createAccount = async (req,res,next)=>{
  try{
    const {
      email,
      password,
      name,
    } = req.body;
    console.log(email)
    const randomUsername = 100+Math.random()*(999-100)
    const username= `${name.toLowerCase().trim()}-${randomUsername}`
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

