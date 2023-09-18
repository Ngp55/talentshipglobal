const mongoose = require('mongoose');

// Define the schema for storing habits entered by user
const newsSchema = new mongoose.Schema({
    textinput: {
        type: String,
        required: true
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
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    },
    {
    timestamp: true,
    }
);

// Create the Habit model using the schema
const News = mongoose.model('News', newsSchema);

// Export the model
module.exports = News;
