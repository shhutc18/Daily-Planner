// Require statements
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const passport = require('passport');

const sequelize = require('./config/connection');

// Creating a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Creating a new SQLite store using the express-session package
const SQLiteStore = require('connect-sqlite3')(session);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// Configuring and linking a session object with the sequelize store
const sess = {
  secret: 'Super secret daily planner key',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/dv' })
};

// Adding express-session and storing as Express.js middleware
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

var indexRouter = require('./controllers/index');

app.use('/', indexRouter);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});