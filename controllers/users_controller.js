const User = require('../models/user');



module.exports.user = function(req, res){

    return res.render('user/user_profiles',{
        title:"Profile"
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
        return res.redirect('/admin/dashboard');
    }


    return res.render('sign_in',{
        title:"Sign In | talentshipglobal",
        layout:"layout"
    })
};

// module.exports.create = function(req, res){
//     if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');

//     }
//     User.findOne({email: req.body.email} , function(err, user){
//         if(err){console.log('errror in finding user in signing up'); return}
//         if(!User){
//             User.create(req.body, function(err , user){
//                 if(err){console.log('error in creating user while signing up'); return}
//                 return res.redirect('/users/sign-in');
//             })
//         }else{
//             return res.redirect('back');
//         }
//     });



// };
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
    return res.redirect('/admin/dashboard');

}

// module.exports.destroySession = function(req ,res){
//     // req.logout();
//     req.logout(function(err) {
//         if (err) {
//           console.log('Error in logging out:', err);
//           return;
//         }
    
//         // Clear the session cookie
//         res.clearCookie('connect.sid');

//     return res.redirect('/');
// }

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
        body:"UserDashboard"
    });
} 

