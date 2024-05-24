const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const Accounts = require("../models/account");
const { tokenExp } = require("../static");
const { validationResult } = require("express-validator");


exports.login = async (req,res,next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      const error = new Error("Validation Error");
      error.statusCode = 500

      error.message=errors.array()[0].msg;
      return next(error); 
  }
  const credentials = req.body;
  const email = credentials.email;
  const hashedPassword  = credentials.password;
  console.log(hashedPassword)
  //decrypt password
  try{
    const account = await Accounts.findOne({
      where:{
        email:email,
      }
    })
 
    if(!account){
      const error = new Error("Not Found");
      error.statusCode = 404;
      error.message="Akun tidak Ditemukan" 
      return next(error);
    }
    console.log(account.password)
    const isEqual = await bcryptjs.compare(hashedPassword,account.password);
    if(!isEqual){
      const error = new Error("Invalid Credentials");
      error.statusCode=401;
      error.message="Salah Password" 
      return next(error);
    }
    //creation of jwt toke
    const token  = jwt.sign(
      {
        account_id:account.account_id,
        username:account.username,
        email : account.email,
      },
      tokenExp,
      {expiresIn:"14d"}
    );

    const update = await Accounts.update({accessToken:token},{
      where:{
        account_id:account.account_id
      }
    })

    //hasil token :
    res.status(200).json({
      data:token
    })
  }catch(error){
    
    next(error);
  }

}

exports.logout = async(req,res,next)=>{
  const{account_id} =req.params 
  try{
    res.clearCookie("jwt");
    const update = await Accounts.update({accessToken:null},{
      where:{
        account_id:account_id
      }
    })
    
    delete req.headers["Authorization"];
    res.status(200).json({
      message:"Logout Berhasil"
    })
  }catch(err){
    next(err)
  }
}