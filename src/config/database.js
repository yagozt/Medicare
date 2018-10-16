const mongoose = require('mongoose'),
constants = require('./constants');
 
 //Removes the warning with promises 
mongoose.Promise = global.Promise;

//Connect the db with the url provided 
try {
    mongoose.connect(constants.MONGO_URL, { useNewUrlParser: true});
} catch (err) {
    mongoose.createConnection(constants.MONGO_URL)
}
mongoose.connection.once('open', () => console.log('MongoDB Running')).on('error', e => {
    throw e;
})