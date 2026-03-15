const express = require("express");
const cors = require("cors");

const app = express();

const connectDB = require("./config/db");
connectDB();

// ⭐ MIDDLEWARE FIRST
app.use(cors());
app.use(express.json());

// ⭐ THEN ROUTES
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const hostelRoutes = require("./routes/hostelRoutes");
app.use("/api/hostels", hostelRoutes);

const roomRoutes = require("./routes/roomRoutes");
app.use("/api/rooms", roomRoutes);

const applicationRoutes = require("./routes/applicationRoutes");
app.use("/api/applications", applicationRoutes);

const allocationRoutes = require("./routes/allocationRoutes");
app.use("/api/allocations", allocationRoutes);

app.get("/", (req, res) => {
  res.send("UniNest Backend Running 🚀");
});

app.listen(5000, () => console.log("Server running on port 5000"));