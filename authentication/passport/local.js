const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");

passport.use(new LocalStrategy((username,password,done) => {   
    
    User.findOne({username}, (err,User) => {

        if(err) return done(err,null ,"Occur an error");

        if(!User) return done(null,false,"User not found");
        
        bcrypt.compare(password, User.password , (err,res) => {

            if(res)
                return done(null , User ,"Successfully logged In");
            else
                return done(null , false , "Invalid password"); 
        })
    });

}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
