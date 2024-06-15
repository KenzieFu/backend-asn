const { DataTypes } = require("@sequelize/core");
const sequelize = require("../database/database");

const table = {
  tablename:"latsol",
  timestamps:true,
}

const LATSOL = sequelize.define("latsol",{
  latsol_id :{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true,
  },
  category_id:{
    type:DataTypes.BIGINT,
    allowNull:false,
    onDelete:"cascade"
  },
  lat_desc:{
    type:DataTypes.TEXT
  },
  jumlah_soal:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue:10
  },
  waktu:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue:720
  },
  lat_thumb:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  lat_file:{
    type:DataTypes.STRING,
    allowNull:false,
  }

},table)

module.exports = LATSOL;