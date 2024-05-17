const { DataTypes } = require("@sequelize/core");
const sequelize = require("../database/database");


const table = {
  tableName:"category",
  timestamps:false,
}
const Category = sequelize.define("category",{
  category_id:{
    type:DataTypes.BIGINT,
    autoIncrement:true,
    primaryKey:true,
  },
  category_alias:{
    type:DataTypes.STRING(20),
    allowNull:false,
    unique:true
  },
  category_name : {
    type:DataTypes.STRING(40),
    allowNull:false,
    unique:true,
  }
},table);

// Category.sync({force:true})


module.exports = Category;