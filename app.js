const express = require("express");
const userRouter = require("./routes/users");  
const mongoose = require("mongoose"); 
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
var exphbs  = require('express-handlebars');

//hi

const app = express();
const PORT = 8000 || process.env.PORT;


// Flash middlewares
app.use(cookieParser("Passport Applicaiton"));
app.use(session({ 
    cookie: { maxAge: 60000 },
    resave: true,
    secret: "Passport Applicaiton",
    saveUninitialized: true
    })
);
app.use(flash());

//Passport Initialize
app.use(passport.initialize());
app.use(passport.session());   

// Global Res.locals - middleware
app.use((req,res,next) => {

    res.locals.flashSuccess = req.flash("flashSuccess");
    next();
})





// Mongodb Connection
mongoose.connect('mongodb://localhost/passportdb', {
    useNewUrlParser : true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to the database");
});


// Templete Engine middleware
app.engine('handlebars', exphbs({defaultLayout : 'mainLayout'}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded( { extended: false }));


// Router middleware
app.use(userRouter);




app.use((req,res) => {
    res.sendFile('404.html', {root : __dirname + '/views/pages'});
});

app.listen(PORT, () => {
    console.log("App started...");
});
 

