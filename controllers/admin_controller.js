//const Data = require('../models/article');

const Service = require('../models/data');
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
        //let services = await Service.findById(req.user.id);
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
            layout: "admin_layout",
            user:user,
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

module.exports.inqueryList = async function(req,res){
  try {
      // Use the find method to retrieve all users
      //const users = await User.find();

      let usersList = await User.find({});

      let userId = req.user.id;
       console.log(userId);
      // let services = await Service.find(user: userId);


      // console.log(services);
      let services = await Service.find({ user: userId });

      console.log(services);
    
      return res.render('admin/inquery',{
      title: "ServiceList || talentshipglobal",
      users:usersList,
      services:services,
      layout:"admin_layout"
  });
  } catch (err) {
      console.log(err);
      return res.redirect('back');
  }
}

module.exports.manageUsers = async function (req, res) {
  let userList = await User.find({});

  return res.render('admin/admin_UsersLists', {
      title: "UserList || talentshipglobal",
      users:userList,
      layout:'admin_layout'
  });
}


module.exports.deleteUsers = async function (req, res) {
  try {
      await User.deleteOne({ _id: req.params.id });     
      // await User.updateMany(
      //     { userToReview: req.params.id },
      //     { $pull: { userToReview: req.params.id } }
      // );
      return res.redirect('back');
  } catch (err) {
      console.log(err);
      return res.redirect('back');
  }
}
