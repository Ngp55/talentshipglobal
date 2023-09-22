const User = require('../models/user');
const News = require('../models/article');


module.exports.home = function(req, res){
     console.log(req.cookies);
     res.cookie('user_id', 24);
    //let user = User.findById(req.user.id);

    return res.render('./home',{
        title: "HomePage || ThinkitToday",
        layout:"layout"
        // user: user
    });
} 