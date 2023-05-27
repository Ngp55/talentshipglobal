module.exports.home = function(req, res){
    
    return res.render('home',{
        title: "HomePage",
        body:"Employee Review System Home Page"
    });
} 