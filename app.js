var sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const formData = require('express-form-data');
const session = require('express-session');
const cors = require('cors')
require('dotenv').config()

var originList = ['http://localhost:3000', 'https://infoapp.htran2.vercel.app', 'https://zofuku-app.herokuapp.com', 'http://store.spaceincome.jp', 'https://store.spaceincome.jp', 'https://infoapp.htran2.vercel.app']
var corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (originList.indexOf(origin) !== -1) {
        callback(null, true)
        } else {
        callback(new Error('Not allowed by CORS'))
        }
    }
}

const TWO_HOURS = 1000*60*60*2

const {
    NODE_ENV = 'development',
    SESS_NAME = 'monkey',
    SESS_SECRET = 'keep it secret, keep it safe!',
    SESS_LIFETIME = TWO_HOURS
} = process.env

const IN_PRO = NODE_ENV === 'production'

const sessionConfig = {
    name: SESS_NAME,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME ,
        secure: IN_PRO, // only set cookies over https. Server will not send back a cookie over http.
    },
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
    resave: false,
    saveUninitialized: false, // GDPR laws against setting cookies automatically
}

// if (process.env.NODE_ENV === 'production') {
//     app.set('trust proxy', 1) // trust first proxy
//     sessionConfig.cookie.secure = true // serve secure cookies
//   }



//import routes
const buyingRoutes = require('./api/nodeBuying/buyingRoutes');
const housingRoutes = require('./api/houseSelling/houseRoutes');
const userRoutes = require('./api/users/userRoutes');
const imageRoutes = require('./api/images/imageRoutes');

app.set('trust proxy', 1);
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