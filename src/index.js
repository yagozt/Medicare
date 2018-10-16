//import './config/database';

const express = require('express'),
constans = require('./config/constants'),
middlewareConfig = require('./config/middleware'),
apiRoutes = require('./modules');
global.Object.conn = require('./config/database');

const app = express();

middlewareConfig(app);

app.get('/', (req, res) => {
    res.send("Hello World");
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
        Make something great!`);
    }
})