const appointmentController = require("../controllers/AppointmentController.js");

const router = require("express").Router();

router.post("/addAppointment", appointmentController.addAppointment);

router.get("/getAppointments", appointmentController.getAllAppointments);

router.delete(
  "/deleteAppointment/:id",
  appointmentController.deleteAppointmentById
);

router.put(
  "/updateAppointment/:id",
  appointmentController.updateAppointmentById
);

// get appointment users
router.get("/getAppointmentUsers", appointmentController.getAppointmentUsers);

module.exports = router;
