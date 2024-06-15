const { where, Op } = require("@sequelize/core");
const HistoryLat = require("../models/historylatsol");

const mudah =3;
const sedang = 7;
const susah = 10;


exports.clearLatsol = async(req,res,next)=>{
  const {latsol_id,account_id} = req.params;
  const {
    total_mudah,
    total_sedang,
    total_susah,
    total_benar,
    total_kosong,
    total_salah,
    total_pengerjaan,

  } = req.body
  try{
    let totalSoal = total_mudah + total_kosong + total_salah
    let totalScore = total_mudah*mudah + total_sedang*sedang + total_susah*susah;
    if(total_benar === totalSoal){
      totalScore+=10
    }
    const data = {
      total_mudah,
    total_sedang,
    total_susah,
    total_benar,
    total_kosong,
    total_salah,
    total_pengerjaan,
    total_score:totalScore,
    account_id,
    latsol_id
    }
    const newLatsol  = await HistoryLat.create(data);

    return res.status(200).json({
      data:newLatsol,
      message:"Berhasil Menyelesaikan Latsol"
    })
  }catch(err){
    next(err);
  }
}

exports.fetchHistoryLatsol = async(req,res,next)=>{
    const{account_id,latsol_id} = req.params;

  try{
    const listHistory = await HistoryLat.findAll({
      where:{
        [Op.and]:{
          account_id:account_id,
          latsol_id:latsol_id
        }
      }
    });
    return res.status(200).json({
      data:listHistory
    })
  }catch(err){
    next(err);
  }
}

exports.fetchDetailLatsol = async(req,res,next)=>{
  const {account_id,historyLat_id} =req.params; 
  try{
      const historyOne = await HistoryLat.findOne({
        where:{
          [Op.and]:{
            account_id:account_id,
            historyLat_id:historyLat_id
          }
        }
      });
      return res.status(200).json({
        data:historyOne
      })
  }catch(err){
    next(err);
  }
}