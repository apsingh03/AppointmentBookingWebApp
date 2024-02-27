const express = require("express");
const cors = require("cors");

const app = express();

// pass in like cors( corsOptions )
// var corsOptions = {
//     origin : "http://localhost:5000"
// }

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
const appointRouter = require("./routes/AppointmentRoutes");
app.use("/appointment", appointRouter);
// app.use("/api/users" , usersRouter);

const userRouter = require("./routes/UsersRoutes");
app.use("/user", userRouter);

// process.env.PORT for production level
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
