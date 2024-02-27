const userController = require("../controllers/UsersController.js");

const router = require("express").Router();

router.get("/getUsers", userController.getAllUsers);

router.post("/addUsers", userController.addUser);

// Foreign Key Routes

router.get("/getUserWithAppointments", userController.getUserWithAppointments);

module.exports = router;
