module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("appointment", {
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slots: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Appointment;
};
