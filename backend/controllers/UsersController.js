const db = require("../models");

// model
const Users = db.users;
const Appointment = db.appointment;

// main functions

// ADD user

const addUser = async (req, res) => {
  let data = {
    name: req.body.name,
    email: req.body.name,
    appointment_id: req.body.appointment_id,
  };
  let query = await Users.create(data);
  res.status(200).send(query);
};

// GET all users

const getAllUsers = async (req, res) => {
  let query = await Users.findAll({});
  res.status(200).send(query);
};

const getUserWithAppointments = async (req, res) => {
  let query = await Users.findAll({
    include: [
      {
        model: Appointment,
        as: "appointment",
      },
    ],
    order: [["id", "DESC"]], // Sorting by id in descending order
  });

  res.status(200).send(query);
};

module.exports = {
  addUser,
  getAllUsers,
  getUserWithAppointments,
};
