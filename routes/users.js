const express = require("express");
const UserController = require("../controllers/userController");
const User = require("../models/user");

const router = express.Router();

router.get("/", (req, res) => {
    User.find({})
    .then(users => {
        
        res.render("pages/index", {users: users});
    }).catch(err => console.log(err));
    
});

router.get("/login", UserController.getUserlogin);

router.get("/register", UserController.getUserRegister);

router.post('/login',UserController.postUserlogin);

router.post("/register",UserController.postUserRegister);

module.exports = router;













