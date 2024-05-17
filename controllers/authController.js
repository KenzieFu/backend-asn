const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const Accounts = require("../models/account");
const { tokenExp } = require("../static");


exports.login = async (req,res,next)=>{

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
      next(error);
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

    //hasil token :
    res.status(200).json({
      data:{
        account_id:account.account_id,
        email:account.email,
        username:account.username,
        token:token
      }
    })
  }catch(error){
    
    next(error);
  }

}

exports.logout = async(req,res,next)=>{
  try{
    res.clearCookie("jwt");
    delete req.headers["Authorization"];
    res.status(200).json({
      message:"Logout Berhasil"
    })
  }catch(err){
    next(err)
  }
}