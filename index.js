const express = require('express');
const app = express();
const productRoutes = require('./routes/products');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(logger);
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Root
app.get('/', (req, res) => res.send('Hello World'));

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
