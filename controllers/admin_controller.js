//const Data = require('../models/article');

module.exports.dashboard = function(req, res){
  if(req.isAuthenticated() && req.user.isAdmin){ // Check if the user is authenticated and has admin privileges
      return res.render('admin/admin_dashboard',{
        title: "Admin Dashboard || talentshipglobal",
        layout:"admin_layout"
  });
  } else {
      return res.render('unauthorized_entry', {
          title:'Unauthorized Entry'
      });
  }
};