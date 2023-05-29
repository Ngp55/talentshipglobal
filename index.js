const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const port = 9000;


app.use(cookieParser());
const expressLayouts = require('express-ejs-layouts');

const dbb = require('./config/mongoose');
//Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');


// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('./assets'));


// it is important to call expresslayouts before routes
app.use(expressLayouts);


// extracting style and scripts from sub pages in to the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);






app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie in the db


app.use(session({
    name: 'EmpRSystem',
    // todo change secret before 
    secret:'boloharharmahadevkijay',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge : (1000 * 60 * 100)
    },
    store: MongoStore.create({
            mongoUrl:'mongodb://localhost/EmpReviewSys',
            autoRemove:"disabled"
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
    
    

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//Using express router
app.use('/', require('./routes'));


app.listen(port , function(error){
    if(error){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})
