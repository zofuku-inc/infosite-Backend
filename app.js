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


const sessionConfig = {
    name: process.env.SESSION_SECRET,
    secret: process.env.SESSION_NAME,
    cookie: {
        maxAge: 1000*60*60*2 ,
        secure: app.get('env') === 'production',
        // sameSite: 'none',
        httpOnly: true
    },
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



//import routes
const buyingRoutes = require('./api/nodeBuying/buyingRoutes');
const housingRoutes = require('./api/houseSelling/houseRoutes');
const userRoutes = require('./api/users/userRoutes');
const imageRoutes = require('./api/images/imageRoutes');

app.set('trust proxy', 1)
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