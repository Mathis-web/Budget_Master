const User = require('../models/User');

const userController = {
    async signup(req, res, next) {
        try {
            const user = new User(req.body);
            await user.save();
            res.status(200).send('Inscription bien effectuée.')
        } catch (error) {
            next(error)
        }
    },

    async login(req, res, next) {
        try {
            const user = new User(req.body);
            const userInfo = await user.checkIfExists();
            res.status(200).send(userInfo)
        } catch (error) {
            next(error)
        }
    } 
}

module.exports = userController;