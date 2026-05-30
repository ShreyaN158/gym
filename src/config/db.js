const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
    console.log("Database:", conn.connection.name);
    console.log("Host:", conn.connection.host);
    console.log("Ready State:", mongoose.connection.readyState);
  } catch (error) {
    console.error("MongoDB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;