const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ThinkitToday');

const db = mongoose.connection;

db.on('error', console.error.bind(console,"ErroR in connection database"));

db.once('open', function(){
    console.log('Konnected to Database:: MongoDB')
});

module.exports = db;
