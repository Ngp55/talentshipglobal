//const Data = require('../models/article');

const User = require('../models/user');

// module.exports.adminDashboard = function(req, res){
//   if(req.isAuthenticated() && req.user.isAdmin){ // Check if the user is authenticated and has admin privileges
//       return res.render('admin/admin_dashboard',{
//         title: "Admin Dashboard || talentshipglobal",
//         layout:"admin_layout"
//   });
//   } else {
//       return res.render('unauthorized_entry', {
//           title:'Unauthorized Entry'
//       });
//   }
// };

module.exports.asideLayout = async function(req,res){
  try {
      // if (!req.isAuthenticated()) {
      //     req.flash('error', 'Please sign in!');
      //     return res.redirect('/users/sign-in');
      // }

      let user = await User.findById(req.user.id);
      return res.render('admin_aside',{
      layout:"layout",
      user:user
  });
  } catch (err) {
      console.log(err);
      return res.redirect('back');
  }
}

module.exports.adminDashboard = async function(req, res) {
  try{
        let user = await User.findById(req.user.id);
        if (req.isAuthenticated() && req.user.isAdmin) {
        // User is authenticated and has admin privileges
          return res.render('admin/admin_dashboard', {
            title: "Admin Dashboard || talentshipglobal",
            layout: "admin_layout"
          });
        } else if (req.isAuthenticated() && !req.user.isAdmin) {
        // User is authenticated but doesn't have admin privileges
        return res.render('user/user_dashboard', {
            title: "User Dashboard || talentshipglobal",
            layout: "admin_layout"
          });
        } else {
        // User is not authenticated
        return res.render('unauthorized_entry', {
            title: 'Unauthorized Entry'
          });
        }
      }catch(err){
          console.log(err);
          return res.redirect('back');
          }
};

module.exports.adminProfile = async function(req, res){
  try {
      if(req.isAuthenticated() && req.user.isAdmin){ // Check if the user is authenticated and has admin privileges
        let user = await User.findById(req.user.id);
      return res.render('admin/admin_profile',{
      title: "Admin Profile || talentshipglobal",
      layout:"admin_layout",
      user:user
        });
    } else {
    return res.render('unauthorized_entry', {
        title:'Unauthorized Entry'
    });
    }
    } catch (err) {
      console.log(err);
      return res.redirect('back');
  }
};

module.exports.userDashboard = function(req, res){
  if(req.isAuthenticated()){ // Check if the user is authenticated and has admin privileges
      return res.render('user/user_dashboard',{
        title: "User Dashboard || talentshipglobal",
        layout:"admin_layout"
  });
  } else {
      return res.render('unauthorized_entry', {
          title:'Unauthorized Entry'
      });
  }
};