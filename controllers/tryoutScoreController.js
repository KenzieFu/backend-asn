
const sequelize = require("../database/database");
const Account = require("../models/account");
const SKDAnalysis = require("../models/skd_analysis");
const TryoutScore = require("../models/tryoutScore");
const Tryout = require("../models/tryout");
const { Op } = require("@sequelize/core");
const passed = 311
const tkpPassed = 156;
const tiuPassed=80
const twkPassed=65
//Ketika user sudah menyelesaikan tryout
exports.tryoutFinished = async (req, res, next) => {
  const t = await sequelize.startUnmanagedTransaction();
  const { account_id, tryout_id } = req.params;

  const {
    twk_score,
    tiu_score,
    tkp_score,
    twk_wrong,
    tiu_wrong,
    tryout_score,
    listCategory_score,
  } = req.body;
  try {
    const addToskd_analysis = await SKDAnalysis.bulkCreate(
      listCategory_score.map((test)=>{
        return {
          ...test,
          account_id,
          tryout_id
        }
      }),
      {
        transaction:t
      }
    );
    const toScore = {
      tryout_id,
      account_id,
      twk_score,
      tiu_score,
      tkp_score,
      twk_wrong,
      tiu_wrong,
      tryout_score,
      tryout_passed:tryout_score>=passed?"Passed":"Failed"
    }
    const addToTryout_score = await TryoutScore.create(toScore,{transaction:t});
    await t.commit()
    return res.status(200).json({
      data:toScore,
      message:"Berhasil Menyelesaikan sebuah Tryout"
    })
  } catch (err) {
    await t.rollback();
    next(err);
  }
};
exports.tryoutRecap = async(req,res,next)=>{
  const {tryout_id,account_id}=req.params;
  try{
    const getRecap = await TryoutScore.findOne({
      where:{
        [Op.and]:{
          account_id:account_id,
          tryout_id:tryout_id
        }
        
      }
    });
    if(!getRecap){
      const error = new Error("Not Found");
      error.statusCode = 500;
      error.message="Gagal mengambil Hasil Tryout Anda";
      return next(error);
    }

    return res.status(200).json({
      data:getRecap
    })
  }catch(err){
    next(err);
  }
}
