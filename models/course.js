const { DataTypes } = require("@sequelize/core");
const sequelize = require("../database/database");
const ClearedCourse = require("./clearedCourse");


const table = {
  tableName:"course",
  timestamps:true,
}

const Course = sequelize.define("course",{
  course_id:{
    type:DataTypes.BIGINT,
    autoIncrement:true,
    primaryKey:true,
  },
  category_id:{
    type:DataTypes.BIGINT,
    allowNull:false,
    onDelete:"SET NULL",
  },
  course_image:{
    type:DataTypes.STRING(200),
    
  },
  course_queue:{
    type:DataTypes.INTEGER,
    allowNull:true
  },
  course_name:{
    type:DataTypes.STRING(60),
    allowNull:false,
    unique:true,
  },
  course_description:{
    type:DataTypes.TEXT,
    allowNull:true,
  },
  course_file:{
    type:DataTypes.STRING(200),
    allowNull:true,
  }

},table);

// Course.sync({force:true})

// Course.belongsTo(SubCategory,{foreignKey:"subCategory_id"});

module.exports= Course;
