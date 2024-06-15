const { DataTypes } = require("@sequelize/core");
const sequelize = require("../database/database");



const table = {
  tableName:"tryoutbundle_tryout",
  timestamps:true,
}
const  TTBundle = sequelize.define("tryout",{
  ttb_id:{
    type:DataTypes.BIGINT,
    autoIncrement:true,
    primaryKey:true,
  },
  tryout_id : {
    type:DataTypes.STRING(80),
    allowNull:false,
  },
  tryoutBundle_id:{
    type:DataTypes.STRING(200),
  },
},table)

// TTBundle.sync({force:true})
module.exports=TTBundle