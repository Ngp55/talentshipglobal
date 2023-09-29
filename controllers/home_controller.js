//const User = require('../models/user');
const Data = require('../models/data');
const User = require('../models/user');



module.exports.home = async function(req, res){
    try {
        if (!req.isAuthenticated()) {
            //req.flash('error', 'Please sign in!');
            return res.redirect('/users/sign-in');
        }

        let user = await User.findById(req.user.id);

        return res.render('home',{
        title: "Home || talentshipglobal",
        layout:"layout",
        user:user
    });
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }

    
};

module.exports.team = function(req, res){
    return res.render('team',{
        title: "Team || talentshipglobal",
        layout:"layout"
    });
};
module.exports.testimonail = function(req, res){
    return res.render('testimonial',{
        title: "Testimonail || talentshipglobal",
        layout:"layout"
    });
};

module.exports.service = function(req, res){
    return res.render('service',{
        title: "Service || talentshipglobal",
        layout:"layout"
    });
};

module.exports.quote = function(req, res){
    return res.render('quote',{
        title: "Quote || talentshipglobal",
        layout:"layout"
    });
};

module.exports.feature = function(req, res){
    return res.render('feature',{
        title: "Feature || talentshipglobal",
        layout:"layout"
    });
};

module.exports.detail = function(req, res){
    return res.render('detail',{
        title: "Details || talentshipglobal",
        layout:"layout"
    });
};

module.exports.contact = function(req, res){
    return res.render('contact',{
        title: "Contact || talentshipglobal",
        layout:"layout"
    });
};

module.exports.blog = function(req, res){
    return res.render('blog',{
        title: "Blog || talentshipglobal",
        layout:"layout"
    });
};
module.exports.about = function(req, res){
    return res.render('about',{
        title: "About || talentshipglobal",
        layout:"layout"
    });
};
