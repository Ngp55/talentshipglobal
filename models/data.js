
const mongoose = require('mongoose');

// Define the schema for storing habits entered by user
const dataSchema = new mongoose.Schema({
    service_name: {
        type: String,
        required:true
    },
   
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required:true
    },
    other_info:{
        type:String,
        required:true
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

const Data = mongoose.model('Data', dataSchema);

// Export the model
module.exports = Data;
