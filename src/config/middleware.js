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
    app.use(passport.initialize());
    
    if (isDev) {
        app.use(morgan('dev'));
    }
};