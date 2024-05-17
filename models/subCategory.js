const { DataTypes } = require("@sequelize/core");
const sequelize = require("../database/database");



const table = {
  tableName:"subcategory",
  timestamps:false,
}
const SubCategory = sequelize.define("subcategory",{
  subCategory_id:{
    type:DataTypes.BIGINT,
    autoIncrement:true,
    primaryKey:true,
  },
  category_id:{
    type:DataTypes.BIGINT,
    onDelete:"cascade",
  
   
  },
  subCategory_name:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
  },
},table) 


// SubCategory.sync({force:true});



module.exports= SubCategory