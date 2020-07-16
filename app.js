const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const formData = require('express-form-data');
const cors = require('cors')
require('dotenv').config()


//import routes
const buyingRoutes = require('./api/nodeBuying/buyingRoutes');
const housingRoutes = require('./api/houseSelling/houseRoutes');
const userRoutes = require('./api/users/userRoutes');
const imageRoutes = require('./api/images/imageRoutes');

//middlewares
app.use(bodyParser.json())
app.use(formData.parse())
app.use(cors())
app.use('/buying', buyingRoutes)
app.use('/sellingHouse', housingRoutes)
app.use('/users', userRoutes)
app.use('/images', imageRoutes)


module.exports = app;