const { DataTypes } = require("@sequelize/core");
const sequelize = require("../database/database");
const UserTransaction = require("./userTryout");


const table = {
  tableName:"tryout",
  timestamps:true,
}
const  Tryout = sequelize.define("tryout",{
  tryout_id:{
    type:DataTypes.BIGINT,
    autoIncrement:true,
    primaryKey:true,
  },
  tryout_title : {
    type:DataTypes.STRING(80),
    allowNull:false,
    unique:true
  },
  tryout_file:{
    type:DataTypes.STRING(200),
    allowNull:false,
  },
  tryout_duration:{
    type:DataTypes.INTEGER,
    allowNull:false,
  },
  tryout_total:{
    type:DataTypes.INTEGER,
    allowNull:false,
  },
  tryout_status:{
    type:DataTypes.ENUM("DISABLE","ACTIVE"),
    defaultValue:"ACTIVE",
  },
  tryout_type:{
    type:DataTypes.ENUM("FREE","PAY"),
    defaultValue:"FREE",
  },
  tryout_price :{
    type:DataTypes.FLOAT,
  },
  tryout_closed :{
    type:DataTypes.DATE,
  }

},table)

module.exports=Tryout