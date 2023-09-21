const mongoose = require('mongoose');

    const domPurifier = require('dompurify');
    const {JSDOM} = require('jsdom');
    const htmlPurify = domPurifier(new JSDOM().window);

    const stripHtml = require('string-strip-html');
    //const stripHtml = require('string-strip-html');
   
    //const stripHtml = import('string-strip-html')

    //import stripHtml from 'string-strip-html';

// Define the schema for storing habits entered by user
const articleSchema = new mongoose.Schema({
    txtinput: {
        type: String
    },
   
    datetimeinput: {
        type: Date,
        required: true
    },
    textarea: {
        type: String
    },
    catnames: {
        type: String,
        enum: ['polity','crime','farming','market','game','culture','entertainment']
        
    },
    snippet:{
        type:String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    },
    {
    timestamp: true,
    }
);
articleSchema.pre('validate',function(next){
    if(this.textarea){
        this.textarea = htmlPurify.sanitize(this.textarea);
        this.snippet = stripHtml(this.textarea.substring(0,200)).result
    }
    
})

// Create the Habit model using the schema
const Article = mongoose.model('Article', articleSchema);

// Export the model
module.exports = Article;
