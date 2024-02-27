require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


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

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Appointment Booking Rest Api docs",
      version: "1.0.0",
      description: `Its an assignment project <br/> <br/> 
      Developed By <b> Ajay Pratap Singh</b>  <br/> <br/> 
      Github  - <b> <a href="https://github.com/apsingh03" target="_blank" >Click Here</a></b>  <br/> <br/> 
      LinkedIn - <b> <a href="https://www.linkedin.com/in/apsingh03/" target="_blank" >Click Here</a></b>  <br/> <br/> 
      Developer Website - <b> <a href="https://ajaypratapsingh.online/" target="_blank" >Click Here</a></b>
      
      `,

      contact: {
        name: "Ajay pratap Singh",
        // url: "ajaypratapsingh.online",
        email: "apsinghjobs@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

// swagger route
//  { explorer: true } it will add a searchbar at Header
const spacs = swaggerJsDoc(swaggerOptions);
app.use("/", swaggerUi.serve, swaggerUi.setup(spacs, { explorer: false }));

// process.env.PORT for production level
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
