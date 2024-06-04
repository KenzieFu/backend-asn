const Notifikasi = require("../models/notifikasi");

exports.fetchNotif = async(req,res,next)=>{
  const {account_id} = req.params;
  try{
    const fetchNotif = await Notifikasi.findAll({
      where:{
        account_id:account_id
      }
    })

    return res.status(200).json({
      data:fetchNotif
    })
  }catch(err){
    next(err);
  }
}