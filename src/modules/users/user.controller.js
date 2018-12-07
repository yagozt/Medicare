const User = require('./user.model'),
HTTPStatus = require('http-status');

module.exports = { 
    async cadastrar(req, res) {
        try {
            const user = await User.createUsuario(req.body);
            return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
        } catch (e) {
            return res.status(HTTPStatus.BAD_REQUEST).json(e);
        }
    },

    login(req, res, next) {
        res.status(HTTPStatus.OK).json(req.user.toAuthJSON());
        return next();
    },

    async remover(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user._id.equals(req.user._id)) {
                return res.sendStatus(HTTPStatus.UNAUTHORIZED);
            }
            user.remove();

            return res.sendStatus(HTTPStatus.NO_CONTENT);
        } catch (error) {
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    },

    async listarUsuarios(req, res) {
        try {
            const users = await User.find({});
            return res.status(HTTPStatus.OK).json(users);
        } catch (error) {
            return res.status(HTTPStatus.BAD_REQUEST).json(error);
        }
    }
}