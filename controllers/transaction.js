const { Op } = require("@sequelize/core");
const UserTransaction = require("../models/transaction");
const Tryout = require("../models/tryout");
const UserTryout = require("../models/userTryout");
const sequelize = require("../database/database");
const Account = require("../models/account");
const Notifikasi = require("../models/notifikasi");
const { uploadFILE } = require("../helper/helper");
const { urlLapis, bucketName } = require("../static");

exports.buyTryout = async (req, res, next) => {
  const { account_id } = req.params;
  const { transaction_title, listTryout, transaction_price } = req.body;
  const file = req.file;
  const t = await sequelize.startUnmanagedTransaction();
  try {
    const parsedArray = JSON.parse(listTryout);
    const checkAccount = await Account.findByPk(account_id);
    const checkTryout = await Tryout.findAll({
      where: {
        tryout_id: { [Op.in]: parsedArray },
      },
    });

    const checkOwned = await UserTryout.findAll({
      where: {
        [Op.and]: {
          tryout_id: { [Op.in]: parsedArray },
          account_id: account_id,
        },
      },
    });

    // Check if account exists
    if (!checkAccount) {
      const error = new Error("Validation Error");
      error.statusCode = 500;
      error.message = "Akun tidak ditemukan";
      return next(error);
    }

    // Check if all tryouts exist
    if (checkTryout.length !== parsedArray.length) {
      const error = new Error("Validation Error");
      error.statusCode = 500;
      error.message = "Salah Satu Tryout Tidak Ditemukan";
      return next(error);
    }

    // Check if any tryouts are already owned
    if (checkOwned.length) {
      const error = new Error("Validation Error");
      error.statusCode = 500;
      error.message =
        "Terjadi Kesalahan, Salah satu tryout yang dimiliki terdapat dalam transaksi";
      return next(error);
    }

    // Check if file is present
    if (!file) {
      const error = new Error("Validation Error");
      error.statusCode = 500;
      error.message = "File Gagal untuk diupload";
      return next(error);
    }

    const uploadAv = await uploadFILE(file, "transaction");
    if (uploadAv === "") {
      const error = new Error("Failed");
      error.statusCode = 500;
      error.message = "File gagal untuk diupload";
      return next(error);
    }

    const counted = parsedArray.length;
    const joined = parsedArray.join(",");
    const data = {
      transaction_title,
      listTryout: joined,
      account_id,
      transaction_status: "SEDANG DIPROSES",
      transaction_price,
      jumlah_to: counted,
      bukti_transaksi: uploadAv,
    };
    const buyTryout = await UserTransaction.create(data, { transaction: t });
    const addTO = await UserTryout.bulkCreate(
      parsedArray.map((to) => {
        return {
          account_id: account_id,
          tryout_id: to,
          userTryout_status: "PENDING",
        };
      }),
      {
        transaction: t,
      }
    );
    await t.commit();

    const notif = {
      account_id: account_id,
      notifikasi_msg: `Transaksi anda untuk \"${transaction_title}\" sedang diproses`,
    };

    const createNotifikasi = await Notifikasi.create(notif);

    if (createNotifikasi) {
      const wss = req.app.get('wss');

      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(createNotifikasi));
        }
      });
    }

    return res.status(201).json({
      message: "Berhasil Membuat Pesanan",
    });
  } catch (err) {
    if (!t.finished) {
      await t.rollback();
    }
    return next(err);
  }
};

exports.updateTransaksi = async (req, res, next) => {
  const { transactionRecord_id } = req.params;
  const { transaction_status } = req.body;
  const t = await sequelize.startUnmanagedTransaction();
  try {
    const findTransaction = await UserTransaction.findOne({
      where: {
        transactionRecord_id: transactionRecord_id,
      },
    });

    if (!findTransaction) {
      const error = new Error("Not Found");
      error.statusCode = 404;
      error.message = "Transaksi Tidak Ditemukan";
      return next(error);
    }
    if (findTransaction.transaction_status != "SEDANG DIPROSES") {
      const error = new Error("Validation Error");
      error.statusCode = 404;
      error.message = "Transaksi Tidak Boleh Diupdate";
      return next(error);
    }
    const splitTryout = findTransaction.listTryout.split(",");
    const updateTransaction = await UserTransaction.update(
      {
        transaction_status,
      },
      {
        where: {
          transactionRecord_id: transactionRecord_id,
        },
        transaction: t,
      }
    );

    if (transaction_status == "GAGAL") {
      const destroyTryout = await UserTryout.destroy({
        where: {
          [Op.and]: {
            tryout_id: splitTryout,
            account_id: findTransaction.account_id,
          },
        },
        transaction: t,
      });

      const notif = {
        account_id: findTransaction.account_id,
        notifikasi_msg: `Transaksi anda untuk \"${findTransaction.transaction_title}\" Gagal`,
      };

      const createNotifikasi = await Notifikasi.create(notif, { transaction: t });

      if (createNotifikasi) {
        const wss = req.app.get('wss');
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(createNotifikasi));
          }
        });
      } 
    } else if (transaction_status == "SUKSES") {
      const update = await UserTryout.update(
        { userTryout_status: "PAID" },
        {
          where: {
            [Op.and]: {
              tryout_id: splitTryout,
              account_id: findTransaction.account_id,
            },
          },
          transaction: t,
        }
      );

      const notif = {
        account_id: findTransaction.account_id,
        notifikasi_msg: `Transaksi anda untuk \"${findTransaction.transaction_title}\" Sukses`,
      };

      const createNotifikasi = await Notifikasi.create(notif, { transaction: t });

      if (createNotifikasi) {
        const wss = req.app.get('wss');
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(createNotifikasi));
          }
        });
      } else {
        throw new Error("Gagal membuat notifikasi");
      }
    }

    await t.commit();
    return res.status(200).json({
      message: "Berhasil Mengupdate Transaksi",
    });
  } catch (err) {
    if (!t.finished) {
      await t.rollback();
    }
    const error = new Error("An Error Occured");
    error.statusCode = 500;
    error.message = "Terjadi Kesalahan dalam Transaksi";
    return next(error);
  }
};


exports.historyTransaksi = async (req, res, next) => {
  const { account_id } = req.params;
  try {
    const history = await UserTransaction.findAll({
      where: {
        account_id: account_id,
      },
      order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ["createdAt", "DESC"],
      ],
    });

    const mapes = history.map((his) => {
      const ltryout = his.listTryout.split(",");
      return {
        transactionRecord_id:his.transactionRecord_id,
        account_id:his.account_id,
        transaction_title:his.transaction_title,
        jumlah_to:his.jumlah_to,
        transaction_status:his.transaction_status,
        transaction_price:his.transaction_price,
        createdAt:his.createdAt,
        updatedAt:his.updatedAt,
        bukti_transaksi:`${urlLapis}/${bucketName}/${his.bukti_transaksi}`,
        listTryout: ltryout,
      };
    });
    return res.status(200).json({
      data: mapes,
    });
  } catch (err) {
    next(err);
  }
};
