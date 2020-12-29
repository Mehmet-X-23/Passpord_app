const formValidation = require("../validation/formValidation");
const User = require("../models/user");
var bcrypt = require('bcryptjs');
const passport = require("passport");
require("../authentication/passport/local");


module.exports.getUserlogin = (req, res) => {

    res.render("pages/login");
};

module.exports.getUserRegister = (req, res) => {

    res.render("pages/register");
};

module.exports.postUserlogin = (req, res,next) => {

    passport.authenticate("local", {

        successRedirect: "/",
        failureRedirect: "/login"
    })(req,res,next);
};

module.exports.postUserRegister = async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const errors = [];
    const validationErrors = formValidation.registerValidation(
        username,
        password
    );
    if (validationErrors.length > 0) {

        return res.render("pages/register", {
            username: username,
            password: password,
            errors: validationErrors
        });
    }
    //console.log(req.body);

    // aynı isim benzerliğini check etme  
    User.findOne({
        username
    }).then((user) => {

        if (user) {
            errors.push({ message: "Username Already In Use" });
            return res.render("pages/register", {

                username: username,
                password: password,
                errors: errors

            });
         }
        else{
             // password hash leme
            bcrypt.genSalt(10, async function (err, salt) {
                bcrypt.hash(password, salt, async function (err, hash) {
                    if (err) throw err;
        
                    const User1 = new User({
        
                        username: username,
                        password: hash
                    });
        
                    await User1.save()
                        .then(() => {
                            console.log("Successfully");
                            req.flash("flashSuccess", "Successfuly Registered");
                            res.redirect("/");
                        }).catch(err => console.log(err));
        
                });
            });
        } 
    }).catch(err => console.log(err));

   
   






};


