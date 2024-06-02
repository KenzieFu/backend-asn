const { DataTypes } = require("@sequelize/core");
const sequelize= require("../database/database");


const table = {
  tableName:"usertransaction",
  timestamps:true,
}
const UserTransaction = sequelize.define("usertransaction",{
  transactionRecord_id:{
    type:DataTypes.BIGINT,
    autoIncrement:true,
    primaryKey:true,
  },
  account_id:{
    type:DataTypes.BIGINT,
    onDelete:"setnull",
    allowNull:true,

  },
  transaction_title:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  jumlah_to:{
    type:DataTypes.BIGINT,
    allowNull:false,
  },
  listTryout:{
    type:DataTypes.STRING,
    allowNull:false
  },
  bukti_transaksi:{
    type:DataTypes.STRING,
    allowNull:false
  },
  transaction_status:{
    type:DataTypes.ENUM("SUKSES","SEDANG DIPROSES","GAGAL"),
  },
  transaction_price:{
    type:DataTypes.FLOAT,
  }

},table)

// UserTransaction.belongsTo(Account,{foreignKey:"account_id"});
module.exports = UserTransaction; 