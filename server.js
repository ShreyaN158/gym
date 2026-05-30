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
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});