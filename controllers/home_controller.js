const User = require('../models/user');

module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 24);
    // let user = User.findById(req.user.id);

    return res.render('home',{
        title: "HomePage || ThinkitToday",
        body:"Thinkit.Today",
        // user: user
    });
} 