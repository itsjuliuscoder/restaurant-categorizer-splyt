const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/restaurantRoutes');
const errorHandler = require('./middleware/errorHandler');
require('./cronJob');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/restaurants', routes);

app.get('/', (req, res) => {
    res.send('Welcome to the Restaurant API!');
});

// Error handling
app.use(errorHandler);

const { PORT } = require('./config/config');
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
