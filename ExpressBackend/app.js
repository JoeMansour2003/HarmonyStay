const express = require("express");
const cors = require("cors");
const hotelRoutes = require("./routes/hotels");
const loginRoutes = require("./routes/login");
const employeesRoutes = require("./routes/employees");
const updateemployeeRoutes = require("./routes/updateemployee");
const customerRoutes = require("./routes/customer");
const rentingRoutes = require("./routes/renting");
const roomNumberRoutes = require("./routes/roomNumber");

const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/hotels", hotelRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/renting", rentingRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/room_number", roomNumberRoutes);
app.use("/api/employees/:id", updateemployeeRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
