/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       required:
 *         - time
 *         - slots
 *       properties:
 *         id:
 *           type: Integer
 *           description: The auto-generated id of the Appointment
 *         time:
 *           type: string
 *           description: Time Title according to 12 Hrs
 *         slots:
 *           type: Integer
 *           description: No of Slots
 *
 *       example:
 *         id: 1
 *         time: 6:00 PM
 *         slots: 8
 *         createdAt: 2024-02-27T09:17:49.000Z
 *         updatedAt: 2024-02-27T09:17:49.000Z
 *
 *
 *       exampleForeignKey:
 *         id: 1
 *         time: 6:00 PM
 *         slots: 8
 *         createdAt: 2024-02-27T09:17:49.000Z
 *         updatedAt: 2024-02-27T09:17:49.000Z
 */

const appointmentController = require("../controllers/AppointmentController.js");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Appointment
 *   description: Nested RestApis
 * /appointment/getAppointments:
 *   get:
 *     summary: Get all timing appointments
 *     tags: [Appointment]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: get all appointments.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Some server error
 *
 */

router.get("/getAppointments", appointmentController.getAllAppointments);

/**
 * @swagger
 * tags:
 *   name: Appointment
 *   description: Nested RestApis
 * /appointment/addAppointment:
 *   post:
 *     summary: Add Appointment Timings
 *     tags: [Appointment]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *
 */
router.post("/addAppointment", appointmentController.addAppointment);

/**
 * @swagger
 * tags:
 *   name: Appointment
 *   description: Nested RestApis
 * /appointment/deleteAppointment/{id}:
 *   delete:
 *     summary: Delete Appointment By Id
 *     tags: [Appointment]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Some server error
 *
 */
router.delete(
  "/deleteAppointment/:id",
  appointmentController.deleteAppointmentById
);

/**
 * @swagger
 * tags:
 *   name: Appointment
 *   description: Nested RestApis
 * /appointment/updateAppointment/{id}:
 *   put:
 *     summary: Update Appointment By Id
 *     tags: [Appointment]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *
 */
router.put(
  "/updateAppointment/:id",
  appointmentController.updateAppointmentById
);

/**
 * @swagger
 * tags:
 *   name: Appointment
 *   description: Nested RestApis
 * /appointment/getAppointmentUsers:
 *   get:
 *     summary: Appointments ForeignKey relation with Users
 *     tags: [Appointment]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: The created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Some server error
 *
 */

// get appointment users
router.get("/getAppointmentUsers", appointmentController.getAppointmentUsers);

module.exports = router;
