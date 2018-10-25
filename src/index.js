//import './config/database';

const express = require('express'),
constans = require('./config/constants'),
middlewareConfig = require('./config/middleware'),
apiRoutes = require('./modules');
global.Object.conn = require('./config/database');

const app = express();

middlewareConfig(app);

app.get('/', (req, res) => {
    res.send("Welcome to Medicare Webapi");
})
apiRoutes(app);
app.listen(constans.PORT, err => {
    if (err) { throw err; }
    else {
        console.log(`
        Server running on port: ${constans.PORT} 
        --- 
        Running on ${process.env.NODE_ENV}
        ---
        MongoDB on ${constans.MONGO_URL} 
        ---
        Make something great!`);
    }
})