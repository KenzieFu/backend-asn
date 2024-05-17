const { DataTypes } = require("@sequelize/core");
const sequelize = require("../database/database");


const table = {
  tableName:"clearedcourse",
  timestamps:true,
}

const ClearedCourse = sequelize.define("clearedcourse",{
  clearedCourse_id:{
    type:DataTypes.BIGINT,
    autoIncrement:true,
    primaryKey:true,
  },
  course_id:{
    type:DataTypes.BIGINT,
    onDelete:"cascade"
  },
  account_id:{
    type:DataTypes.BIGINT,
    onDelete:"cascade",
  },

},table);



module.exports= ClearedCourse;
