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
  tryout_id:{
    type:DataTypes.BIGINT,
    onDelete:"setnull",
    allowNull:true,
  
  },
  transaction_status:{
    type:DataTypes.ENUM("PAID","PENDING","FAILED"),
  },
  transaction_price:{
    type:DataTypes.FLOAT,
  }

},table)
// UserTransaction.sync({force:true})
// UserTransaction.belongsTo(Account,{foreignKey:"account_id"});
module.exports = UserTransaction; 