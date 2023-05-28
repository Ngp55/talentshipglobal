// const User = require('../models/user');

module.exports.user = function(req, res){

    return res.render('user_profile',{
        title:"Users Lists"
    })
};
// render the signup page
module.exports.signUp = function (req, res){

    return res.render('sign_up',{
        title:"EmpReview System | Sign Up"
    })
};

// render the signin page
module.exports.signIn = function (req, res){

    return res.render('sign_in',{
        title:"EmpReview System | Sign In"
    })
};

module.exports.create = function(req, res){


}

//sign in and create session
module.exports.createSession = function(req, res){

}