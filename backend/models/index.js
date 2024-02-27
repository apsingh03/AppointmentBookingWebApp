// we r importing
const dbConfig = require("../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DBNAME,
  dbConfig.USER,

  dbConfig.Password,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    // pool: {
    //     max: 5,
    //     min : 0,
    //     acquire : 30000,
    //     idle : 10000
    // }
  }
);

// we need to authenticate
sequelize
  .authenticate()
  .then(() => {
    console.log("sequelize Connected");
  })
  .catch((error) => {
    console.log("Sequelize ", error);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// table Name
db.appointment = require("./appointmentModel.js")(sequelize, DataTypes);
db.users = require("./usersModel.js")(sequelize, DataTypes);

// if u write force : true every time u run the server u will lose all of your data
db.sequelize.sync({ force: false }).then(() => {
  console.log("Yes re-sync done!");
});

// 1 to many relation || Foreign Key
db.appointment.hasMany(db.users, {
  foreignKey: "appointment_id",
  as: "users",
});

db.users.belongsTo(db.appointment, {
  foreignKey: "appointment_id",
  as: "appointment",
});

module.exports = db;
