const express = require('express');


const app = express();
const port = 9000;



const expressLayouts = require('express-ejs-layouts');

const dbb = require('./config/mongoose');
app.use(express.static('./assets'));
// it is important to call expresslayouts before routes
app.use(expressLayouts);
// extracting style and scripts from sub pages in to the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Using express router
app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port , function(error){
    if(error){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})
