const Sequelize = require("@sequelize/core");

const sequelize = new Sequelize("backend-asn","root","",{
  host:"localhost",
  port:3306,
  dialect:"mysql",
  dialectOptions: {
    useUTC: false, 
  },
  timezone: '+07:00', 
  sync:true
})

module.exports = sequelize;