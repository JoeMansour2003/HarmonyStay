const express = require('express');
const cors = require('cors');
const hotelRoutes = require('./routes/hotels');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/hotels', hotelRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
