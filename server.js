require("dotenv").config();

const express = require("express");

const cors = require("cors");

const morgan = require("morgan");

const helmet = require("helmet");

const cookieParser = require("cookie-parser");

const connectDB = require("./src/config/db");
const authRoutes =
require("./src/routes/authRoutes");
const testRoutes =
require("./src/routes/testRoutes");


const membershipRoutes =
require("./src/routes/membershipRoutes");
 const workoutRoutes =
require("./src/routes/workoutRoutes");
const attendanceRoutes =
require("./src/routes/attendanceRoutes");

const app = express();
console.log("MONGO_URI =", process.env.MONGO_URI);
connectDB();

app.use(express.json());

app.use(cors());
app.use(
 "/api/test",
 testRoutes
);
app.use(morgan("dev"));

app.use(helmet());

app.use(cookieParser());
app.use(
 "/api/test",
 testRoutes
);
app.use(
 "/api/workout",
 workoutRoutes
);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Gym Membership API Running"
  });
});

const PORT = process.env.PORT || 5000;
app.use(
 "/api/auth",
 authRoutes
);
app.use(
  "/api/membership",
  membershipRoutes
);
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});



app.use(
 "/api/attendance",
 attendanceRoutes
);

const adminRoutes =
require("./src/routes/adminRoutes");

app.use(
 "/api/admin",
 adminRoutes
);

const reportRoutes =
require("./src/routes/reportRoutes");

app.use(
 "/api/reports",
 reportRoutes
);

const { body }
=
require("express-validator");