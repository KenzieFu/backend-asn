const Sequelize = require("@sequelize/core");

const sequelize = new Sequelize("backend-asn","root","",{
  host:"localhost",
  port:3306,
  dialect:"mysql",
  sync:true
})

module.exports = sequelize;