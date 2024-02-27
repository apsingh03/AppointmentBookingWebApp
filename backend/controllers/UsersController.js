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
  // let decreaseSlots = await Appointment.update(
  //     slots = slots - 1  ,
  //     {
  //     where : {id : req.body.appointment_id }}
  // )

  // decreaseSlots.slots =  decreaseSlots.slots - 1;

  // console.log( "decreaseSlots - " , decreaseSlots.slots )

  res.status(200).send(query);
};

// GET all users

const getAllUsers = async (req, res) => {
  // console.log("------------------------------------")
  let query = await Users.findAll({});
  // console.log("-----> " , query )
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
  });

  res.status(200).send(query);
};

module.exports = {
  addUser,
  getAllUsers,
  getUserWithAppointments,
};
