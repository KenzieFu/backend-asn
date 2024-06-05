const Notifikasi = require("../models/notifikasi");
const { wss } = require('../index');

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

exports.createNotif = async (req, res, next) => {
  const { account_id } = req.params;
  const { notifikasi_msg } = req.body;
  
  try {
    if (!notifikasi_msg) {
      const error = new Error("Validation Error");
      error.statusCode = 500;
      error.message = "Pesan notifikasi tidak boleh kosong!";
      return next(error);
    }

    const createNotifikasi = await Notifikasi.create({ account_id, notifikasi_msg });

    if (createNotifikasi) {
      const wss = req.app.get('wss');

      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(createNotifikasi));
        }
      });

      res.status(200).json({
        message: "Berhasil Menambahkan notifikasi",
        notification: createNotifikasi
      });
    } else {
      res.status(500).json({
        message: "Gagal membuat notifikasi"
      });
    }
  } catch (error) {
    next(error);
  }
};