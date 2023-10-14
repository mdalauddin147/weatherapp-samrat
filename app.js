const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');


const initializePassport = require('./passport-config');
initializePassport(passport, username => {
    return users.find(user => user.username === username);
})

const app = express();

const path = require("path");

require('dotenv').config();

authRoutes = require("./routes/auth");
feedRoutes = require("./routes/feed");

let users = [];

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


app.get('/', checkAuthenticated, (req, res) => {
    const userName = req.user.username;
    const defaultLocation = req.user.home;
    res.render('index', { userName, defaultLocation });
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login');
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    try{
        const hashedPw = await bcrypt.hash(req.body.password, 10 )
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            email: req.body.email,
            password: hashedPw,
            home: req.body.home
        })
        res.redirect('/login');
    }catch(error){
        console.error(error);
        res.redirect('/register');
    }
    console.log(users)
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        res.redirect('/')
    }
    next()
}

PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
