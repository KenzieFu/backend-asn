const { DataTypes } = require("@sequelize/core");
const sequelize= require("../database/database");


const table = {
  tableName:"usertryout",
  timestamps:true,
}
const UserTryout = sequelize.define("usertryout",{
  userTryout_id:{
    type:DataTypes.BIGINT,
    autoIncrement:true,
    primaryKey:true,
  },
  account_id:{
    type:DataTypes.BIGINT,
    onDelete:"cascade",
    allowNull:true,

  },
  tryout_id:{
    type:DataTypes.BIGINT,
    onDelete:"cascade",
    allowNull:true,
  
  },
  userTryout_status:{
    type:DataTypes.ENUM("PAID","PENDING"),
  },
},table)
// UserTransaction.sync({force:true})
// UserTryout.sync({force:true})
// UserTransaction.belongsTo(Account,{foreignKey:"account_id"});
module.exports = UserTryout; 