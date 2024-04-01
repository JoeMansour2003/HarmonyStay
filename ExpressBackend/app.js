const express = require("express");
const cors = require("cors");
const hotelRoutes = require("./routes/hotels");
const loginRoutes = require("./routes/login");
const employeesRoutes = require("./routes/employees");
const updateemployeeRoutes = require("./routes/updateemployee");
const customerRoutes = require("./routes/customer");
const rentingRoutes = require("./routes/renting");
const roomNumberRoutes = require("./routes/roomNumber");
const createRentingRoutes = require("./routes/createRenting");
const getarchives = require("./routes/archives");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use('/api/employees', updateemployeeRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/renting", rentingRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/room_number", roomNumberRoutes);
app.use("/api/employees/:id", updateemployeeRoutes);
app.use("/api/createRenting", createRentingRoutes);
app.use("/api/archives", getarchives);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
