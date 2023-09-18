
const path = require('path');


// Example controller function to render a user profile page
module.exports.dashboard = (req, res) => {
  const viewPath = path.join(__dirname, '..', 'views', 'admin', 'admin_dashboard.ejs');
  const viewPath404 = path.join(__dirname, '..', 'views', 'admin', 'unauthorized_entry.ejs');
  console.log(viewPath);
  console.log(viewPath404);
  
  if(req.isAuthenticated() && req.user.isAdmin){ // Check if the user is authenticated and has admin privileges
    return res.render(viewPath,{
      title: "Dashboard || ThinkitToday",
      layout:"admin_layout"
    });
} else {
    return res.render('viewPath404', {
        title:'Thinkittoday | Unauthorized Entry'
    });
}




};



// module.exports.dashboard = function(req, res){
//     // console.log(req.cookies);
//     // res.cookie('user_id', 24);
    
//     const viewPath = path.join(__dirname, '..', 'views', 'admin', 'admin_dashboard.ejs');
//     res.render(viewPath,{
//         title: "AddPost || ThinkitToday",
//         body:"rendered by controller",
//         layout:"admin_layout"

//     });
// } 
// module.exports.addsubadmin = function(req, res){
//     // console.log(req.cookies);
//     // res.cookie('user_id', 24);
//     return res.render('admin_addSubAdmin',{
//         title: "AddSubAdmin || ThinkitToday",
//         body:"AddSubAdmin"
//     });
// } 
// module.exports.addsubcategory = function(req, res){
//     // console.log(req.cookies);
//     // res.cookie('user_id', 24);
//     return res.render('admin_addSubCategory',{
//         title: "AddSubCategory || ThinkitToday",
//         body:"AddSubCategory"
//     });
// } 

// module.exports.dashboard = function(req, res){
//     // console.log(req.cookies)
//     res.cookie('user_id', 24);
    
//     // return res.render('./admin/admin_dashboard', {
//     //     title: "Dashboard || ThinkitToday",
//     //     body: "Admin Dashboard",
//     //     layout: "admin_layout"
//     // }, (err, ejs) => {
//     //     if (err) {
//     //         console.error('Error rendering page:', err);
//     //         return res.status(500).send('Error rendering page');
//     //     }
//     //     console.log('Page rendered successfully');
//     //     res.send(ejs); // Send the rendered HTML response
//     // });      
//     const viewPath = path.join(__dirname, '..', 'views', 'admin', 'admin_dashboard.ejs');
//   res.render(viewPath,{
//     title: "Dashsboard || ThinkitToday",
//     layout:"admin_layout"
//   });



// } 



// module.exports.managecategory = function(req, res){
//     // console.log(req.cookies);
//     // res.cookie('user_id', 24);
//     return res.render('admin_manageCategory',{
//         title: "ManageCategory || ThinkitToday",
//         body:"ManageCategory"
//     });
// } 
// module.exports.managesubadmin = function(req, res){
//     // console.log(req.cookies);
//     // res.cookie('user_id', 24);
//     return res.render('admin_manageSubAdmin',{
//         title: "ManageSubAdmin || ThinkitToday",
//         body:"ManageSubAdmin"
//     });
// } 