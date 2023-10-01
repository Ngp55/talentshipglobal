
const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

const url = `process.env.MONGODB_URI`;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

    const db = mongoose.connection;

    module.exports = db;



