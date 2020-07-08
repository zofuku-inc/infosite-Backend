const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const formData = require('express-form-data');
const cors = require('cors')
require('dotenv').config()


//import routes
const buyingRoutes = require('./routes/buyingRoutes');
const housingRoutes = require('./routes/houseRoutes');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');

//middlewares
app.use(bodyParser.json())
app.use(formData.parse())
app.use(cors())
app.use('/buying', buyingRoutes)
app.use('/sellingHouse', housingRoutes)
app.use('/users', userRoutes)
app.use('/images', imageRoutes)


module.exports = app;