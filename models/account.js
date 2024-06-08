const { DataTypes } = require("@sequelize/core");
const sequelize = require("../database/database");


const table = {
  tableName:"account",
  timestamps:true
}

const Account = sequelize.define("account",{
  account_id :{
    type:DataTypes.BIGINT,
    autoIncrement:true,
    primaryKey:true
  },
  username:{
    type:DataTypes.STRING(50),
    allowNull:false,
    unique:true
  },
  name:{
    type:DataTypes.STRING(60),
    allowNull:false,
  },
  email:{
    type:DataTypes.STRING(60),
    allowNull:false,
    unique:true,
  },
  password:{
    type:DataTypes.STRING(60),
    allowNull:false, 
  },
  phone:{
    type:DataTypes.STRING(60),
    allowNull:false
  },
  role:{
    type: DataTypes.ENUM("OWNER","ADMIN","MEMBER"),
    defaultValue:"MEMBER",
    allowNull:false
  },
  accessToken:{
    type:DataTypes.STRING(80),
    allowNull:true,
  },
  avatar:{
    type:DataTypes.STRING(200),
    allowNull:true,
  },
  userRecap:{
    type:DataTypes.STRING(80),
    allowNull:true,
  }

},table)

// Account.sync({force:true})
// Category.sync({force:true})
// SubCategory.sync({force:true})
// Course.sync({force:true})
// TryoutToken.sync({force:true})
// Tryout.sync({force:true})
// TryoutScore.sync({force:true})
// UserTransaction.sync({force:true})



module.exports = Account;
