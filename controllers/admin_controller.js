const Article = require('../models/article');
const sanitizeHtml = require('sanitize-html');

module.exports.dashboard = function(req, res){
  if(req.isAuthenticated() && req.user.isAdmin){ // Check if the user is authenticated and has admin privileges
      return res.render('admin/admin_dashboard',{
        title: "Admin Dashboard || ThinkitToday",
        layout:"admin_layout"
  });
  } else {
      return res.render('unauthorized_entry', {
          title:'Codeial | Unauthorized Entry'
      });
  }
}

module.exports.addPost = (req, res) => {
  
 
  if(req.isAuthenticated() && req.user.isAdmin){ // Check if the user is authenticated and has admin privileges
    return  res.render('admin/admin_addPost',{
      title: "AddPost || ThinkitToday",
      layout:"admin_layout"
});
} else {
    return res.render('unauthorized_entry', {
        title:'Codeial | Unauthorized Entry'
    });
}

};

module.exports.postList = (req, res) => {
  
  
  if(req.isAuthenticated() && req.user.isAdmin){ // Check if the user is authenticated and has admin privileges
    return  res.render('adminw/admin_postLists',{
      title: "Post List || ThinkitToday",
      layout:"admin_layout"
});
} else {
    return res.render('unauthorized_entry', {
        title:'Codeial | Unauthorized Entry'
    });
}
};




// module.exports.createArticle = async function (req, res) {
//     try {
//         if (!req.isAuthenticated()) {
//             return res.status(401).json({ error: 'Unauthorized' });
//         }

//         const { textinput, datetimeinput, textarea, catnames, user } = req.body; // Exclude 'content' for now

//         // Use tinymce.activeEditor.getContent() to get the 'content' from the TinyMCE editor
//         const content = tinymce.activeEditor.getContent();

//         // Create a JSON object with the properties you want to save
//         const articleData = {
//             textinput,
//             datetimeinput,
//             textarea: JSON.stringify(content), // Save 'content' as a JSON string within 'textarea'
//             catnames,
//             user,
            
//         };

//         const article = new Article(articleData);
//         const savedArticle = await article.save();

//         // Render the page of addPost
//         res.render('addPost', {
//             article: savedArticle, // Pass the saved article to the view
//             title: 'CreatingHabits'
//         });

//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create Article' });
//     }
// };

// module.exports.createArticle = async function(req,res){
//   try {
//     const { textinput, datetimeinput, catnames, textarea } = req.body;
//     console.log(req.body);
    
//     // Assuming 'textarea' contains JSON data, parse it into an object
//     const parsedTextarea = JSON.parse(textarea);
//     console.log(parsedTextarea);

//     // Create a new Article instance
//     const article = new Article({
//         textinput,
//         datetimeinput,
//         catnames,
//         textarea: JSON.stringify(parsedTextarea), // Save 'parsedTextarea' as JSON string
//         user: req.user // Assuming you have user authentication and req.user contains user information
//     });

//     // Save the article to the database
//     const savedArticle = await article.save();

//     // Redirect to a success page or send a response as needed
//     res.status(201).json({ message: 'Article saved successfully', article: savedArticle });
// } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to save the article' });
// }

// };
module.exports.createArticle = async function (req, res) {
  // try {
  //   if (!req.isAuthenticated()) {
  //     return res.status(401).json({ error: 'Unauthorized' });
  //   }

  //   const { textinput, datetimeinput, catnames, textarea } = req.body;
  //   console.log(req.body);

  //    // Create a new Article instance
  // const article = new Article({
  //     textinput,
  //     datetimeinput,
  //     catnames,
  //     textarea,
  //     user: req.user 
  // });

  //   const savedArticle = await article.save();
    
  //   res.status(201).json({ message: 'Article saved successfully', article: savedArticle });
    
    
  // } catch (error) {
  //   res.status(500).json({ error: 'Failed to save the article' });
  // }
  const { txtinput,datetimeinput,catnames,textarea} =req.body;
    console.log("########################");
    console.log(typeof txtinput);console.log(typeof datetimeinput);console.log(typeof catnames);console.log(typeof textarea);
    console.log("########################");
    console.log(req.body);
    //To sanitize the html tags that malpractise can't be done
    const sanitizedContent = sanitizeHtml(textarea, {
      allowedTags: [...sanitizeHtml.defaults.allowedTags],
      allowedAttributes: {},
    });

    if (!txtinput || !textarea) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }
  
  try {
  
    const article = new Article({
      txtinput,
      datetimeinput,
      catnames,
      textarea: sanitizedContent,
      user: req.user 
    });
  
    // Save the article
    const savedArticle = 
    await article.save();
  
    res.status(201).json({ message: 'Article saved successfully', article: savedArticle });
    
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