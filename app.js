const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
// const { sequelize } = require('./db/models');

const environment = require('./config');
const isProduction = environment === 'production';

const app = express();
app.set("view engine", "pug")

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
    app.use(cors());
}

app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
)

const routes = require('./routes');
app.use(routes);

// const store = new SequelizeStore({ db: sequelize });

module.exports = app;