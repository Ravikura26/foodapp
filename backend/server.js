const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
// Routes from here
const authRoutes = require('./routes/authRoutes');
const itemRoute = require('./routes/itemRoute');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoute = require('./routes/orderRoute');


// Routes till here
const errorHandler = require('./helpers/errorhandler');
const connectDB = require('./config/connect');

const app = express();

// COnnect DBb
connectDB()

// Middleware
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes); 
app.use('/api/item', itemRoute);
app.use('/api/order', orderRoute);

// General error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
