require('dotenv').config();
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportConfig = require('./config/passport-config');
const conn = require('./config/connection');
const flash = require('connect-flash');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;

// require root
const homeRoute = require('./routes/home-route');
const logoutRoute = require('./routes/logout-route');
const loginRoute = require('./routes/login-route');
const authRoute = require('./routes/auth-route');


app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(cookieSession({
    name: 'session',
    keys: ['asal', 'asal2']
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.message = req.flash('message');
    // jika req.flash('message') belum di buat maka req.flash('message) bernilai default [] (array kosong)
    next();
})

// set Route
app.use('/', homeRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/auth', authRoute);



app.listen(port, () => console.log('live at localhost:' + port));