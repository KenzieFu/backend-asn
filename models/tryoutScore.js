const { DataTypes } = require("@sequelize/core");
const sequelize = require("../database/database");

const table = {
  tableName :"tryoutscore",
  timestamps:true,
}
const TryoutScore = sequelize.define("tryoutscore",{
  tryoutScore_id :{
    type:DataTypes.BIGINT,
    autoIncrement:true,
    primaryKey:true,
  },
  tryout_id:{
    type:DataTypes.BIGINT,
    onDelete:"cascade",
  
  },
  account_id:{
    type:DataTypes.BIGINT,
    onDelete:"cascade",

  },
  twk_score:{
    type:DataTypes.INTEGER,

  },
  tiu_score:{
    type:DataTypes.INTEGER,
  },
  tkp_score:{
    type:DataTypes.INTEGER,
  },
  twk_wrong:{
    type:DataTypes.INTEGER,
  },
  tiu_wrong:{
    type:DataTypes.INTEGER,
  },
  tryout_score :{
    type:DataTypes.FLOAT,
  }
},table)



module.exports = TryoutScore;