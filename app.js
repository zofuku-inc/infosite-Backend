const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()


//import routes
const buyingRoutes = require('./routes/buyingRoutes');
const housingRoutes = require('./routes/houseRoutes');
const userRoutes = require('./routes/userRoutes');

//middlewares
app.use(bodyParser.json())
app.use(cors())
app.use('/buying', buyingRoutes)
app.use('/sellingHouse', housingRoutes)
app.use('/users', userRoutes)


const PORT = process.env.PORT || 5005
app.listen(PORT, () => {
    console.log(`API is listening at port ${PORT}`)
})