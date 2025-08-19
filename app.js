const express = require('express');
const session = require('express-session');
const pool = require('./config/pool');
const passport = require('passport');
const path = require('path');
const app = express();
require('dotenv').config();
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const PgSession = require('connect-pg-simple')(session);
require('./config/passport');


app.use(
    session({
      store: new PgSession({
        pool,                
        tableName: "session"
      }),
      secret: process.env.SESSION_SECRET || "keyboard cat",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
      }
    })
  );

app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

// Make user available in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/auth', authRouter);
app.use('/', indexRouter);

app.listen(process.env.PORT, (error)=>{
    if(error){
        throw new error;
    }
    console.log("Server listening on port " + process.env.PORT);
})


