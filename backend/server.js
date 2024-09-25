require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require('body-parser');

//import routers
const userRouter = require("./controllers/UsersController");
const profileRouter = require("./controllers/ProfileController");
const inviteRouter = require("./controllers/InviteController");
const appointmentRouter = require("./controllers/AppointmentController");
const adminRouter = require("./controllers/AdminController");
const locationRouter = require("./controllers/LocationController");

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());


//Routes
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/invitation', inviteRouter);
app.use('/api/appointment', appointmentRouter);
app.use('/api/location', locationRouter);
app.use('/api/admin', adminRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
