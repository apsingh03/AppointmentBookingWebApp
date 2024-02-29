const db = require("../models");

// create main Model

const Appointment = db.appointment;
const Users = db.users;

// main work

// 1. post create appointment

const addAppointment = async (req, res) => {
  let info = {
    time: req.body.time,
    slots: req.body.slots,
  };

  const query = await Appointment.create(info);

  res.status(200).send(query);
  console.log(query);
};

// GET
const getAllAppointments = async (req, res) => {
  let query = await Appointment.findAll({});

  // when we only want few columns
  // let query = await  Appointment.findAll({
  //     attributes: [
  //         "title",
  //         "price"
  //     ]
  // })
  res.status(200).send(query);
};

// GET BY ID
const getAppointmentById = async (req, res) => {
  let id = req.params.id;
  let query = await Appointment.findOne({ where: { id: id } });
  res.status(200).send(query);
};

// UPDATE
const updateAppointmentById = async (req, res) => {
  let id = req.params.id;
  let query = await Appointment.update(req.body, { where: { id: id } });
  res.status(200).send(query);
};

// DELETE

// GET BY ID
const deleteAppointmentById = async (req, res) => {
  let id = req.params.id;
  //   console.log("Delete id ", id);
  await Appointment.destroy({ where: { id: id } });
  res.status(200).send({ msg: "Appointment Deleted" });
};

// Relation
const getAppointmentUsers = async (req, res) => {
  const query = await Appointment.findAll({
    include: [
      {
        model: Users,
        // as shoud match with index.js hasMany as
        as: "users",
      },
    ],
    // where : {id : 1 }
  });

  res.status(200).send(query);
};

// patch
const decreaseSlotById = async (req, res) => {
  let idd = req.params.id;
  // console.log("YES GETTING ID "  , idd);

  let query = await Appointment.findByPk(idd);

  if (query.slots > 0) {
    query.slots -= 1;
    query = await query.save();
  }

  res.status(200).send(query);
};

module.exports = {
  addAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
  getAppointmentUsers,
  decreaseSlotById,
};
