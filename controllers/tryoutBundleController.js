const { QueryTypes } = require("@sequelize/core");
const sequelize = require("../database/database");
const { uploadFile } = require("../helper/helper");
const Tryout = require("../models/tryout");
const TTBundle = require("../models/tryoutBundle_tryout");
const TryoutBundle = require("../models/tryout_bundle");

// exports.fetchBundle = async(req,res,next)=>{
//   try{
//     const bundle = await
//   }catch(err){
//     next(err);
//   }

// }

exports.createTryoutBundle = async (req, res, next) => {
  // listTryout = [1,2,3,4]
  //descList  =["nskladals","ksahklasd","kahsdahsdlha"]
  const { listTryout, price, tryoutBundle_name, description, descList } =
    req.body;
  const transaction = await sequelize.startUnmanagedTransaction();
  try {
    listTryout.map((is) => {
      console.log(is);
    });

    // make array to string split to ,

    const splitDesLis = descList.join(",");

    const data = {
      price: price,
      tryoutBundle_name: tryoutBundle_name,
      description,
      descList: splitDesLis,
    };
    //create new bundle
    const newBundle = await TryoutBundle.create(data, {
      transaction: transaction,
    });

    if (listTryout.length != 0) {
      const addTryoutToBundle = await TTBundle.bulkCreate(
        listTryout.map((toId) => {
          return {
            tryout_id: toId.toString(),
            tryoutBundle_id: newBundle.tryoutBundle_id,
          };
        }),
        {
          transaction: transaction,
        }
      );
    }
    await transaction.commit();
    return res.status(200).json({
      message: "Berhasil menambahkan bundle baru",
    });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

exports.fetchOneTryoutBundle = async (req, res, next) => {
  const {account_id,tryoutBundle_id} = req.params;
  try {
    const bundles = await sequelize.query(
      `
    SELECT 
    tb.*,
    (SELECT GROUP_CONCAT(ttb.tryout_id SEPARATOR ",") FROM tryoutbundle_tryout ttb WHERE ttb.tryoutBundle_id=tb.tryoutBundle_id) as listTryout_id,
    (SELECT GROUP_CONCAT(ut.tryout_id SEPARATOR ",") FROM usertryout ut WHERE ut.tryout_id IN (SELECT ttb.tryout_id FROM tryoutbundle_tryout ttb WHERE ttb.tryoutBundle_id=tb.tryoutBundle_id) AND ut.account_id=${account_id}) as userBought,
    (SELECT SUM(t.tryout_price) FROM tryout t WHERE t.tryout_id IN (SELECT ttb.tryout_id FROM tryoutbundle_tryout ttb WHERE ttb.tryoutBundle_id=tb.tryoutBundle_id)) as base_price
FROM tryout_bundle tb WHERE tb.tryoutBundle_id = ${tryoutBundle_id} LIMIT 1 ;`,
      {
        type: QueryTypes.SELECT,
      }
    );

 
      const bundletTryout = bundles.listTryout_id.split(",");
      const userClearedTryout = bundles.userBought?bundles.userBought.split(","):null;

      const updatedPrice = Math.floor(bundles.tryout_price/bundletTryout.length) *(userClearedTryout?userClearedTryout.length:0);

      const boolBought =bundles.userBought == bundles.listTryout_id;
      const changedPrice= bundles.userBought ===null?bundles.tryout_price:bundles.tryout_price-updatedPrice;
      const split = bundles.descList.split(",");
      const newData= {
        ...bundles,
        tryout_price:changedPrice,
        listTryout_id:bundletTryout,
        userBought:userClearedTryout,
        boolBought:boolBought,
        descList:split
      }
    
    return res.status(200).json({
      data: newData,
    });
  } catch (err) {
    next(err);
  }
};

exports.fetchTryoutBundle = async (req, res, next) => {
  const {account_id} = req.params;
  try {
    const bundles = await sequelize.query(
      `
    SELECT 
    tb.*,
    (SELECT GROUP_CONCAT(ttb.tryout_id SEPARATOR ",") FROM tryoutbundle_tryout ttb WHERE ttb.tryoutBundle_id=tb.tryoutBundle_id) as listTryout_id,
    (SELECT GROUP_CONCAT(ut.tryout_id SEPARATOR ",") FROM usertryout ut WHERE ut.tryout_id IN (SELECT ttb.tryout_id FROM tryoutbundle_tryout ttb WHERE ttb.tryoutBundle_id=tb.tryoutBundle_id) AND ut.account_id=${account_id}) as userBought,
    (SELECT SUM(t.tryout_price) FROM tryout t WHERE t.tryout_id IN (SELECT ttb.tryout_id FROM tryoutbundle_tryout ttb WHERE ttb.tryoutBundle_id=tb.tryoutBundle_id)) as base_price
FROM tryout_bundle tb;`,
      {
        type: QueryTypes.SELECT,
      }
    );

    const newBundle = bundles.map((data)=>{
      const bundletTryout = data.listTryout_id.split(",");
      const userClearedTryout = data.userBought?data.userBought.split(","):null;

      const updatedPrice = Math.floor(data.tryout_price/bundletTryout.length) *(userClearedTryout?userClearedTryout.length:0);
      const split = bundles.descList.split(",");
      const boolBought =data.userBought == data.listTryout_id;
      const changedPrice= data.userBought ===null?data.tryout_price:data.tryout_price-updatedPrice;

      return {
        ...data,
        tryout_price:changedPrice,
        listTryout_id:bundletTryout,
        userBought:userClearedTryout,
        boolBought:boolBought,
        descList:split
      }
    })
    return res.status(200).json({
      data: newBundle,
    });
  } catch (err) {
    next(err);
  }
};
