var sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const formData = require('express-form-data');
const session = require('express-session');
const cors = require('cors')
require('dotenv').config()

var originList = ['http://localhost:3000', 'https://infoapp.htran2.vercel.app', 'https://zofuku-app.herokuapp.com', 'http://store.spaceincome.jp', 'https://store.spaceincome.jp']
var corsOptions = {
    credentials: true,
    // origin: "http://localhost:3000"
    origin: function (origin, callback) {
        if (originList.indexOf(origin) !== -1) {
        callback(null, true)
        } else {
        callback(new Error('Not allowed by CORS'))
        }
    }
}


const sessionConfig = {
    name: 'monkey',
    secret: 'keep it secret, keep it safe!',
    expires: new Date(Date.now() + (30 * 86400 * 1000)),
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 60 ,
        secure: false, //should be set to true in production
        httpOnly: true,
        // proxy : true,
        path: '/'
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
app.set('trust proxy', 1);
// app.enable('trust proxy');

app.use(sslRedirect());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(formData.parse());
app.use(session(sessionConfig));
app.use(cors(corsOptions));
app.use('/buying', buyingRoutes);
app.use('/sellingHouse', housingRoutes);
app.use('/users', userRoutes);
app.use('/images', imageRoutes);


module.exports = app;