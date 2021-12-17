const Token = require('../models/Token');
const {generateAccessToken} = require('../services/generateToken');

const tokenController = {
    async generateNewAccessToken(req, res, next) {
        try {
            const token = new Token({name: req.user.token, userId: req.user.id});
            await token.checkIfExists();
            const accessToken = generateAccessToken({id: req.user.id, email: req.user.email});
            // replace expired token by a new one
            res.clearCookie('accessToken');
            res.cookie('accessToken', accessToken, {httpOnly: true, maxAge: 2629800000});
            res.status(200).send({accessToken});
        } catch (error) {
            next(error);
        }
    },

    async deleteOne(req, res, next) {
        try {
            const token = new Token({userId: req.user.id});
            await token.delete();
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.status(200).send('Vous êtes déconnecté.');
        } catch (error) {
            next(error)
        }
    }
}

module.exports = tokenController;