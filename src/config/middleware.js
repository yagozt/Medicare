const morgan = require('morgan'),
bodyParser = require('body-parser'),
compression = require('compression'),
helmet = require('helmet'),
passport = require('passport');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

module.exports = (app) => {
    if (isProd) {
        app.use(compression());
        app.use(helmet());
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });

    app.use(passport.initialize());
    
    if (isDev) {
        app.use(morgan('dev'));
    }
};