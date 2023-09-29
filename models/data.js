
const mongoose = require('mongoose');


// Define the schema for storing habits entered by user
const dataSchema = new mongoose.Schema({
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
    published:{
        type:Boolean,
        default:false
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

const Data = mongoose.model('Data', dataSchema);

// Export the model
module.exports = Data;
