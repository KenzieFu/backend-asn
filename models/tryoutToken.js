const { DataTypes } = require("@sequelize/core");
const sequelize = require("../database/database");

const table = {
  tableName:"tryouttoken",
  timestamps:true,
}

const TryoutToken = sequelize.define("tryouttoken",{
  tryoutToken_id :{
    type:DataTypes.BIGINT,
    autoIncrement:true,
    primaryKey:true,
  },
  tryoutToken_code:{
    type:DataTypes.STRING(200),
    unique:true,
  },
  tryoutToken_status:{
    type:DataTypes.ENUM("REDEEMED","UNUSED"),
    defaultValue:"UNUSED"
  },
  tryoutToken_listTryout:{
    type:DataTypes.STRING(50),
    allowNull:false,
  },
},table)

module.exports = TryoutToken;