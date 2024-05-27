const { DataTypes } = require("@sequelize/core");
const sequelize = require("../database/database");


const table = {
  tableName :"tryout_bundle",
  timestamps:true
}

const TryoutBundle = sequelize.define("tryout_bundle",{
  tryoutBundle_id:{
    type:DataTypes.BIGINT,
    autoIncrement:true,
    primaryKey:true
  },
  listTryout :{
    type:DataTypes.STRING,
    allowNull:false,
  },
  description_txt:{
    type:DataTypes.STRING,
    allowNull:false,
  }
  
},table);

TryoutBundle.sync({force:true});

module.exports = TryoutBundle