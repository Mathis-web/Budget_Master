const Token = require('../models/Token');
const {generateAccessToken} = require('../services/generateToken');

const tokenController = {
    async generateNewAccessToken(req, res, next) {
        try {
            const token = new Token({name: req.user.token, userId: req.user.id});
            await token.checkIfExists();
            const accessToken = generateAccessToken({id: req.user.id, email: req.user.email});
            res.status(200).send({accessToken});
        } catch (error) {
            next(error);
        }
    },

    async deleteOne(req, res, next) {
        try {
            const token = new Token({userId: req.user.id});
            await token.delete();
            res.status(200).send('Votre compte a bien été supprimé.');
        } catch (error) {
            next(error)
        }
    }
}

module.exports = tokenController;