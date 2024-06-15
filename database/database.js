const Sequelize = require("@sequelize/core");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.GOOGLE_CLOUD_DATABASE,
  process.env.GOOGLE_CLOUD_SQL_USER,
 process.env.GOOGLE_CLOUD_PASS,
  {
    host:process.env.GOOGLE_CLOUD_HOST,
    port: 3306,
    dialect: "mysql",
    dialectOptions: {
      useUTC: false,
    },
    timezone: "+07:00",
    sync: true,
  }
);

module.exports = sequelize;
