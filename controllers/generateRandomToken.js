
const TryoutToken = require("../models/tryoutToken");
const nano = require("nanoid");
const UserTryout = require("../models/userTryout");
const sequelize = require("../database/database");
const Notifikasi = require("../models/notifikasi");
const { Op } = require("@sequelize/core");




exports.createRandomToken = async(req,res,next)=>{
  const {qty,listTryoutId} = req.body;
  const listToken=[]
  for(i=0;i<qty;i++){
    listToken.push({
      tryoutToken_code:nano.nanoid(16),
      tryoutToken_listTryout:listTryoutId
    })
  }
  try{
    const createBulkToken = await TryoutToken.bulkCreate(listToken)
    res.status(200).json({
      message:`Berhasil Menambahkan ${qty} token`
    })
  }catch(err){
    next(err);
  }
}

exports.redeemToken = async(req,res,next)=>{
  const t = await sequelize.startUnmanagedTransaction();
  const{account_id} = req.params;
  const { tryoutToken_code} = req.body
  try{
    const checkToken = await TryoutToken.findOne({
      where:{
        tryoutToken_code:tryoutToken_code
      }
    });
    if(!checkToken){
      const error = new Error("Not Found");
      error.statusCode = 404
      error.message = "Token tidak ditemukan / kadaluarsa"
      return next(error);
    }
    if(checkToken.tryoutToken_status ==="REDEEMED"){
      const error = new Error("Validation");
      error.statusCode = 500
      error.message = "Token telah di pakai"
      return next(error);
    }
    console.log(checkToken)
    let splitTryout = checkToken.tryoutToken_listTryout.split(",")
    
    const userto = await UserTryout.findAll({
      where:{
        tryout_id: { [Op.in]: splitTryout },
        account_id:account_id
      }
    })

    const listTo = userto.map((to)=>to.tryout_id);
  
    let haveAll = splitTryout.filter((el)=> !listTo.includes(el));
  
    if(haveAll.length ==0){
      const error = new Error("Validation");
      error.statusCode=500;
      error.message="Maaf, Anda sudah memiliki semua tryout dalam token ini."
      return next(error);
    }

    const updateToken = await TryoutToken.update({
      tryoutToken_status:"REDEEMED"
    },{
      where:{
        tryoutToken_code:tryoutToken_code
      },
      transaction:t
    });

   
    
    
   
  
      const userTryoutadd = await UserTryout.bulkCreate(
        haveAll.map((toId)=>{
          return {
            account_id:account_id,
            tryout_id:toId,
            userTryout_status:"PAID"
          }
        },{
          transaction:t
        })
      )

    

    const notifmsg = {
      account_id:account_id,
      notifikasi_title:"Redeem Berhasil",
      notifikasi_msg:`Anda Berhasil Meredeem Token ${tryoutToken_code}`
    }

    const createNotif = await Notifikasi.create(notifmsg,{transaction:t})
    await t.commit()
    res.status(200).json({
      message:"Berhasil Meredeem token"
    })

  }catch(err){
    await t.rollback()
    next(err);
  }
}