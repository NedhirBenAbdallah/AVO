// backend/index.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { Pool } = require('pg'); // Use pg module to connect to PostgreSQL
const authRoutes = require('./routes/authRoutes');  
const userRoutes = require('./routes/userRoutes');  
const ligneRoutes = require('./routes/ligneRoutes');
const cors = require('cors');
const trackRoutes = require('./routes/trackRoutes');
const CauseArretRoutes = require('./routes/CauseArretRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure the database connection using environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());
app.use(cors());
// Middleware to attach the pool to the request object
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.use('/', authRoutes);
//app.use('/login', userRoutes);
app.use('/user', userRoutes);
app.use('/ligne', ligneRoutes);
app.use('/track', trackRoutes);
// app.use('/cause-arret', CauseArretRoutes);
app.use('/CauseArret', CauseArretRoutes); 
app.use('/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});