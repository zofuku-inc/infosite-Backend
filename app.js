const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const formData = require('express-form-data');
const session = require('express-session');
const cors = require('cors')
require('dotenv').config()

const sessionConfig = {
    name: 'monkey',
    secret: 'keep it secret, keep it safe!',
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false, //should be set to true in production
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false, // GDPR laws against setting cookies automatically

}


//import routes
const buyingRoutes = require('./api/nodeBuying/buyingRoutes');
const housingRoutes = require('./api/houseSelling/houseRoutes');
const userRoutes = require('./api/users/userRoutes');
const imageRoutes = require('./api/images/imageRoutes');

//middlewares
app.use(bodyParser.json())
app.use(formData.parse())
app.use(session(sessionConfig))
app.use(cors())
app.use('/buying', buyingRoutes)
app.use('/sellingHouse', housingRoutes)
app.use('/users', userRoutes)
app.use('/images', imageRoutes)


module.exports = app;