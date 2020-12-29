module.exports.registerValidation = (username , password) => {

    const errors = [];

    if(username === "")
        errors.push({message: "Fill the username area"});
    if(password === "")
        errors.push({message:"Fill the password area"});
    if(password.length < 6){
        errors.push({message: "password length must be grather than 6"});
    }
    
    return errors; 
};