const User = require("../models/user");

exports.signup = async (req, res, next) => {
    try{
        const {username, email, password, home } = req.body;

        if(password !== confirm_password){
            res.send('Passwords do not match');
            res.redirect('/register');
        }else{
            const newUser = new User({
                username,
                email,
                home,
                password
            })
        }
    }catch(error){
        console.error(error);
        res.status(400).send('Registration failed please try again.')
    }
}

exports.login = (req, res, next) => {
    try{
        const {email, password} = req.body;

        let existingUser = User.findOne({email});

        if(!existingUser){
            res.json({message: "The user doesn't exist"});
        }

        //logic for logging in here
        if(password !== existingUser.password){
            res.json({message: "Invalid Password"});
        }


    }catch(error){
        console.error('Error:', error);
        next(error);
    }
}

exports.renderLoginPage = (req, res, next) => {
    res.render('index');
}

exports.renderWeatherPage = (req, res, next) => {
    res.render('index', {userName, defaultLocation});
}