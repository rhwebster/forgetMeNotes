const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./db/models');
const path = require('path');
const createError = require('http-errors');
const session = require('express-session');
const { sessionSecret } = require('./config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tagsRouter = require('./routes/tags');
const listsRouter = require('./routes/lists');
const { restoreUser } = require('./auth');
const tasksApiRouter = require('./api/tasks');
const apiListsRouter = require('./api/lists');
const apiTagsRouter = require('./api/tags');

const app = express();
app.set("view engine", "pug")

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const store = new SequelizeStore({ db: sequelize });
app.use(session({
    secret: sessionSecret,
    store,
    saveUninitialized: false,
    resave: false,
}))

store.sync();

app.use(restoreUser);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lists', listsRouter);
app.use('/tags', tagsRouter);
app.use('/api', tasksApiRouter);
app.use('/api/tags', apiTagsRouter);
app.use('/api/lists', apiListsRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
})

module.exports = app;