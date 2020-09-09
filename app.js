var sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const formData = require('express-form-data');
const session = require('express-session');
const cors = require('cors');
const KnexSessionStore = require('connect-session-knex')(session);
require('dotenv').config()

const db = require('./database/dbConfig');

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



const sessionConfig = {
    name: 'monkey',
    secret: 'keep it secret, keep it safe!',
    cookie: {
        maxAge: 1000*60*60*2 ,
        secure: app.get('env') === 'production', // only set cookies over https. Server will not send back a cookie over http.
        domain: '.store.spaceincome.jp'
    },
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
    resave: false,
    proxy: true,
    saveUninitialized: false, // GDPR laws against setting cookies automatically
    store: new KnexSessionStore({
        tablename: 'session',
        sidfieldname: 'sid',
        knex: db,
        createtable: true,
        clearInterval: 1000 * 60 * 60  //removes only expired
    })
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sessionConfig.cookie.secure = true // serve secure cookies
  }



//import routes
const buyingRoutes = require('./api/nodeBuying/buyingRoutes');
const housingRoutes = require('./api/houseSelling/houseRoutes');
const userRoutes = require('./api/users/userRoutes');
const imageRoutes = require('./api/images/imageRoutes');


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