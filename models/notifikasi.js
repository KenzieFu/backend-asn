const { DataTypes } = require("@sequelize/core");
const sequelize = require("../database/database")



const table={
  tableNam:"notifikasi",
  timestamp:true
}


const Notifikasi = sequelize.define("notifikasi",{
  notifikasi_id :{
    type:DataTypes.BIGINT,
    autoIncrement:true,
    primaryKey:true,
  },
  account_id:{
    type:DataTypes.BIGINT,
    allowNull:false,
    onDelete:"cascade"
  },
  notifikasi_title:{
    type:DataTypes.STRING(60),
    allowNull:false,
    defaultValue:"Unknown",
  },
  isClicked:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:false
  },
  notifikasi_msg :{
    type:DataTypes.STRING, 
    allowNull:false,
    defaultValue:"Unknown"
  }
},table);


module.exports = Notifikasi;
