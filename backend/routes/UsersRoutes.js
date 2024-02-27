/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: Integer
 *           description: The auto-generated id of the users
 *         name:
 *           type: string
 *           description: full name of the user
 *         email:
 *           type: string
 *           description: email address of the user
 *
 *       example:
 *         id: 19
 *         name: Ajay pratap singh
 *         email: ajay@gmail.com
 *         createdAt: 2024-02-27T09:17:49.000Z
 *         updatedAt: 2024-02-27T09:17:49.000Z
 *         appointment_id : 4
 */

const userController = require("../controllers/UsersController.js");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Nested RestApis
 * /user/getUsers:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 *
 */

router.get("/getUsers", userController.getAllUsers);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Nested RestApis
 * /user/addUsers:
 *   post:
 *     summary: Add user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 *
 */

router.post("/addUsers", userController.addUser);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Nested RestApis
 * /user/getUserWithAppointments:
 *   get:
 *     summary: Users ForeignKey relation with Appointment
 *     tags: [User]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 *
 */

// Foreign Key Routes
router.get("/getUserWithAppointments", userController.getUserWithAppointments);

module.exports = router;
