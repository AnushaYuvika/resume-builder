const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const resumeRoutes = require("./routes/resumeRoutes");

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.send("Resume Backend Server is running");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

  
app.listen(8080, () => {
  console.log("Server running on port 8080");
});