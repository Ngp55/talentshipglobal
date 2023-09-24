//const User = require('../models/user');
const Articles = require('../models/article');


module.exports.home = async function(req, res){
    //  console.log(req.cookies);
    //  res.cookie('user_id', 24);
    //let user = User.findById(req.user.id);

    let articles = await Articles.find({},'txtinput datetimeinput textarea catnames');
    //console.log(articles[0]);

    return res.render('./home',{
        title: "HomePage || ThinkitToday",
        layout:"layout",
        articles:articles
    });
};

module.exports.singlepage = async function(req,res){
    console.log(req.header);

    let articles = await Articles.find({},'txtinput datetimeinput textarea catnames');
    return res.render('single_Page',{
        title:"SinglePage ||ThinkitToday",
        articles:articles
    });
};
