const { DataTypes } = require("@sequelize/core");
const sequelize = require("../database/database");

const table={
  tableName:"historylat",
  timestamps:true,
}

const HistoryLat = sequelize.define("historylat",{
  historyLat_id:{
    type:DataTypes.BIGINT,
    autoIncrement:true,
    primaryKey:true,
  },
  account_id:{
    type:DataTypes.BIGINT,
    allowNull:false,
    onDelete:"cascade"
  },
  latsol_id:{
    type:DataTypes.BIGINT,
    allowNull:false,
    onDelete:"cascade"
  },
  total_score:{
    type:DataTypes.INTEGER,
    defaultValue:0,
  },
  total_mudah:{
    type:DataTypes.INTEGER,
    defaultValue:0
  },
  total_sedang:{
    type:DataTypes.INTEGER,
    defaultValue:0
  },
  total_susah:{
    type:DataTypes.INTEGER,
    defaultValue:0
  },
  total_benar:{
    type:DataTypes.INTEGER,
    defaultValue:0
  },
  total_salah:{
    type:DataTypes.INTEGER,
    defaultValue:0
  },
  total_kosong:{
    type:DataTypes.INTEGER,
    defaultValue:0
  },
  total_pengerjaan:{
    type:DataTypes.INTEGER,
    
  }
},table)


module.exports = HistoryLat;