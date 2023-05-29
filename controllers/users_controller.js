const User = require('../models/user');

module.exports.user = function(req, res){

    return res.render('user_profiles',{
        title:"Users Lists"
    })
};
// render the signup page
module.exports.signUp = function (req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/userlist');
    }



    return res.render('sign_up',{
        title:"Sign Up | EmpReview System"
    })
};

// render the signin page
module.exports.signIn = function (req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/userlist');
    }


    return res.render('sign_in',{
        title:"Sign In | EmpReview System"
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
    return res.redirect('/');

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
  