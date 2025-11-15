const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');  // ✅ Correct name
const Routes = require('./routes/indexRoutes'); // ✅ Example route import

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
connectDB();

// ✅ Routes
app.use('/api', Routes); // Example route

// ✅ Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
