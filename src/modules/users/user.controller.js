const User = require('./user.model'),
HTTPStatus = require('http-status');

module.exports = { 
    async signUp(req, res) {
        try {
            const user = await User.create(req.body);
            return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
        } catch (e) {
            return res.status(HTTPStatus.BAD_REQUEST).json(e);
        }
    },

    login(req, res, next) {
        res.status(HTTPStatus.OK).json(req.user.toAuthJSON());
        return next();
    }
}