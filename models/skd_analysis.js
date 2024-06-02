const { DataTypes } = require("@sequelize/core");
const sequelize = require("../database/database");


const table = {
  tableName:"skd_analysis",
  timestamps:true,
}
skd_analysis = [
  {subCategory_id:1,subcategory_score:25},
  {subCategory_id:2,subcategory_score:15}
]
 

const SKDAnalysis = sequelize.define("skd_analysis",{
  skdAnalysis_id:{
    type:DataTypes.BIGINT,
    autoIncrement:true,
    primaryKey:true,
  },
  account_id:{
    type:DataTypes.BIGINT,
    onDelete:"cascade"
  },
  subCategory_id:{
    type:DataTypes.BIGINT,
    onDelete:"cascade"
  },
  subCategory_score:{
    type:DataTypes.INTEGER,
  },
  tryout_id:{
    type:DataTypes.BIGINT,
    allowNull:false
  }

},table);

// SKDAnalysis.sync({force:true})

module.exports= SKDAnalysis;
