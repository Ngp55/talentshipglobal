
const mongoose = require('mongoose');

// const multer = require('multer');

// const path = require('path');
// const ARTICLEIMG_PATH = path.join('/uploads/articles/photos')



    // const domPurifier = require('dompurify');
    // const {JSDOM} = require('jsdom');
    // const htmlPurify = domPurifier(new JSDOM().window);

    // const stripHtml = require('string-strip-html');
    //const stripHtml = require('string-strip-html');
   
    //const stripHtml = import('string-strip-html')

    //import stripHtml from 'string-strip-html';

// Define the schema for storing habits entered by user
const articleSchema = new mongoose.Schema({
    txtinput: {
        type: String,
        required:true
    },
   
    datetimeinput: {
        type: Date,
        required: true
    },
    textarea: {
        type: String,
        required:true
    },
    catnames: {
        type: String,
        enum: ['polity','crime','farming','market','game','culture','entertainment'],
        required:true
        
    },
    // photos:{
    //     type:String
    // },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    },
    {
    timestamp: true,
    }
);
// articleSchema.pre('validate',function(next){
//     if(this.textarea){
//         this.textarea = htmlPurify.sanitize(this.textarea);
//         this.snippet = stripHtml(this.textarea.substring(0,200)).result
//     }
    
// })

// Create the Habit model using the schema
// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname,'..',ARTICLEIMG_PATH))
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// });

// articleSchema.static.uploadedPhotos = multer({storage: storage}).single('photos ');
// articleSchema.statics.photosPath = ARTICLEIMG_PATH;

const Article = mongoose.model('Article', articleSchema);

// Export the model
module.exports = Article;
