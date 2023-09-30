const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const DOMPurify = require('dompurify')(window);

const User = require('../models/user');
const Service = require('../models/data');


module.exports.user = function(req, res){
    return res.render('user/user_profiles',{
        title:"Profile",
        layout:"admin_layout"
    })
};
// render the signup page
module.exports.signUp = function (req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/userlist');
    }
    return res.render('sign_up',{
        title:"Sign Up | talentshipglobal",
        layout:'layout'
    })
};

// render the signin page
module.exports.signIn = function (req, res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }


    return res.render('sign_in',{
        title:"Sign In | talentshipglobal",
        layout:"layout"
    })
};

module.exports.create = async function(req, res) {
    try {
        if (req.body.password != req.body.confirm_password) {
            return res.redirect('back');
        }

        const user = await User.findOne({ email: req.body.email }).exec();
        if (!user) {
            await User.create({...req.body, isAdmin: false});
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error in finding/creating user while signing up:', err);
        return res.status(500).send('Internal Server Error');
    }
};





//sign in and create session
module.exports.createSession = function(req, res){
    return res.redirect('/');

}

// Render Forget Password page
module.exports.forgetPasswordPage = function (req, res) {
    return res.render('forget_password', {
        title: 'Forget Password | talentshipglobal'
    });
}


// Update user's password with newly created password
module.exports.forgetPasswordLink = async function (req, res) {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.redirect('/users/signUp');
    }
    if (req.body.password == req.body.confirmPassword) {
        req.flash('success', 'Password Changed :)');
        user.password = req.body.password;
        await user.updateOne({ password: req.body.password });
        return res.redirect('/users/sign-in');
    }
    return res.redirect('back');
};

module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
      if (err) {
        console.log('Error in logging out:', err);
        return;
      }
  
      // Clear the session cookie
      res.clearCookie('connect.sid');
      return res.redirect('/');
    });
  };
  

  module.exports.userdashboard = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 24);
    return res.render('user/user_dashboard',{
        title: "UserDashboard || talentshipglobal",
        layout:'admin_layout'
    });
} 



module.exports.createService = async function (req, res) {
        const { service_name,description,price, other_info } =req.body;
  
      console.log("########################");
      console.log(typeof service_name);console.log(typeof description);console.log(typeof price);console.log(typeof other_info);
      console.log("########################");
      // Sanitize and save the HTML content
    const sanitizedHTML_1 = DOMPurify.sanitize(req.body.description); // Assuming textarea is the rich text input
    const sanitizedHTML_2 = DOMPurify.sanitize(req.body.other_info); // Assuming textarea is the rich text input
    
    try {
    
      const services = new Service({
        service_name,
        price,
        description: sanitizedHTML_1,
        other_info: sanitizedHTML_2,
        user: req.user 
      });
      // Save the article
      const savedServices = await services.save();
      
  
  
      res.status(201).json({ message: 'Article saved successfully', services : savedServices });
      
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Handle validation errors
        const validationErrors = {};
        for (const field in error.errors) {
          validationErrors[field] = error.errors[field].message;
        }
        res.status(400).json({ error: 'Validation failed', validationErrors });
      } else {
        // Handle other errors
        console.error('Error saving article:', error);
        res.status(500).json({ error: 'Failed to save the article' });
      }
    }
  };
  
//   module.exports.serviceList = function(req, res){
//     return res.render('user/user_serviceList',{
//         title: "ServiceList || talentshipglobal",
//         layout:"admin_layout"
//     });
// };


module.exports.serviceList = async function(req,res){
  try {
      let user = await User.findById(req.user.id);
      let userId = req.user.id;
       console.log(userId);
      // let services = await Service.find(user: userId);


      // console.log(services);
      let services = await Service.find({ user: userId });

    console.log(services);



    
        //console.log(services.service_name);
        // console.log(service.price);
        // console.log(service.description);
        // console.log(service.other_info);
    
      return res.render('user/user_serviceList',{
      title: "ServiceList || talentshipglobal",
      user:user,
      services:services,
      layout:"admin_layout"
  });
  } catch (err) {
      console.log(err);
      return res.redirect('back');
  }
}