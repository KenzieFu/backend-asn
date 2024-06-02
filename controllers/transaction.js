const { Op } = require("@sequelize/core");
const UserTransaction = require("../models/transaction");
const Tryout = require("../models/tryout");
const UserTryout = require("../models/userTryout");
const sequelize = require("../database/database");
const Account = require("../models/account")
exports.buyTryout = async (req,res,next)=>{
  const {account_id} = req.params;
  const {transaction_title,listTryout,transaction_price} = req.body;
  const file = req.file;
  const t = await sequelize.startUnmanagedTransaction();
  try{
    const checkAccount = await Account.findByPk(account_id);
    const checkTryout = await Tryout.findAll({
      where:{
        tryout_id:{in:listTryout}
      }
    });
    const checkOwned = await UserTryout.findAll({
      where:{tryout_id:{in:listTryout}}
    })
    //check kalau account terdapat dalam database
    if(!checkAccount){
      const error = new Error("Validation Error");
      error.statusCode= 500;
      error.message="Akun tidak ditemukan";
      return next(error);
    }
    /// check kalau tryout terdapat dalam database
    if(checkTryout.length != listTryout.length){
      const error = new Error("Validation Error");
      error.statusCode =500;
      error.message = "Salah Satu Tryout Tidak Ditemukan";
      return next(error);
    }
    if(!checkOwned.length){
      const error = new Error("Validation Error");
      error.statusCode = 500;
      error.message = "Terjadi Kesalahan, Salah satu tryout yang dimiliki terdapat dalam transaksi";
      return next(error);
    }
    
    //Check jika file tidak ditemukan
    if(!file){
      const error = new Error("Validation Error");
      error.statusCode = 500;
      error.message = "File Gagal untuk diupload";
      return next(error);
    }
    const uploadAv = await uploadFILE(file,"transaction");
    if(uploadAv ===""){
      const error = new Error("Failed");
      error.statusCode = 500;
      error.message="File gagal untuk diupload"
      return next(error);
    }
    
    const counted = listTryout.length;
    const joined = listTryout.join(",");
    const data = {
      transaction_title,
      listTryout:joined,
      account_id,
      transaction_status:"SEDANG DIPROSES",
      transaction_price,
      jumlah_to:counted,
      bukti_transaksi:uploadAv
    }
    const buyTryout = await UserTransaction.create(data,{transaction:t});
    const addTO = await UserTryout.bulkCreate(
      listTryout.map((to)=>{
        return {
          account_id:account_id,
          tryout_id:to,
          userTryout_status:"PENDING"
        }
      }),{
        transaction:t
      }
    )
    return res.status(200).json({
      message:"Berhasil Membuaat Pesanan"
    });
  }catch(err){
    next(err);
  }
}

exports.updateTransaksi = async(req,res,next)=>{
  const {transactionRecord_id} = req.params;
  const {transaction_status}  = req.body;
  const t = await sequelize.startUnmanagedTransaction();
  try{
    
    const findTransaction = await UserTransaction.findOne({
      where:{
        transactionRecord_id:transactionRecord_id
      }
    })

    if(!findTransaction){
      const error = new Error("Not Found");
      error.statusCode =404;
      error.message = "Transaksi Tidak Ditemukan"
      return next(error);
    }
    if(findTransaction.transaction_status !="SEDANG DIPROSES"){
      const error = new Error("Validation Error");
      error.statusCode =404;
      error.message = "Transaksi Tidak Boleh Di update"
      return next(error);
    }
    const splitTryout = findTransaction.listTryout.split(',');
    const updateTransaction = await UserTransaction.update({
      transaction_status
    }

      ,{
      where:{
        transactionRecord_id:transactionRecord_id
      },
      transaction:t
    });
    if(transaction_status =="GAGAL"){
      const destroyTryout=await UserTryout.destroy({ where: { 
        [Op.and]:{
          tryout_id:splitTryout,
          account_id:findTransaction.account_id
        }
       
       },
       transaction:t
      
      })
    
    }
    else if(transaction_status == "SUKSES"){
      const update = await UserTryout.update({transaction_status:transaction_status},{
        where:{
          [Op.and]:{
            tryout_id:splitTryout,
            account_id:findTransaction.account_id
          }
        }
      })
    }
    await t.commit();
    return res.status(200).json({
      message:"Berhasil Mengupdate Transaksi"
    })
  }catch(err){
    t.rollback();
    const error = new Error("An Error Occured");
    error.statusCode= 500;
    error.message="Terjadi Kesalahan dalam Transaksi"
    return next(error);
  }
}

exports.historyTransaksi = async(req,res,next)=>{
  const {account_id} = req.params;
  try{
    const history = await UserTransaction.findAll({
      where:{
        account_id:account_id
      },
      order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ['createdAt', 'DESC'],
      ]
    });

    const mapes = history.map((his)=>{
      const ltryout = his.listTryout.replaceAll("").split(",");
      return {
        ...his,
        listTryout:ltryout
      }
    })
    return res.status(200).json({
      data:history
    })
  }catch(err){
    next(err);
  }
}