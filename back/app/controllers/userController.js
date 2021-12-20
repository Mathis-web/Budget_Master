const User = require('../models/User');
const Token = require('../models/Token');
const ErrorHandler = require('../error/ErrorHandler');

const { generateAccessToken, generateRefreshToken } = require('../services/generateToken');

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
            // 1: check if user entered correct email and password
            const user = new User(req.body);
            const userInfo = await user.checkIfExists();
            const userPlainObject = {
                id: userInfo.id,
                email: userInfo.email
            }
            // 2: generate access token and refresh token. We stock the refresh token in the database
            // this refresh token will be used to generate new access token when the previous one is expired
            const accessToken = generateAccessToken(userPlainObject);
            const refreshToken = new Token({
                name: generateRefreshToken(userPlainObject),
                userId: userInfo.id
            });
            const refreshTokenInfos = await refreshToken.save();
            // 3: send back access and refresh token to the client
            // access token (short expiration date) = use to access main features of the api (create category...);
            // refresh token = use to create a new access token
            res.cookie('accessToken', accessToken, {httpOnly: true, maxAge: 2629800000});
            res.cookie('refreshToken', refreshTokenInfos.name, {httpOnly: true, maxAge: 2629800000});
            res.status(200).send({accessToken, refreshToken: refreshTokenInfos.name});
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    async getUserData(req, res, next) {
        try {
            const user = new User({id: req.user.id});
            const data = await user.getAllData();
            res.status(200).json(data);
        } catch (error) {
            next(new ErrorHandler(500, 'Une erreur est survenue lors de la récupération de vos dépenses. Veuillez réessayer.'));
        }
    },

    isLoggedIn(req, res, next) {
        // check if there is a cookie in the request, if yes it means that the user is logged in
        if (req.cookies && req.cookies.refreshToken && req.cookies.accessToken) {
            res.status(200).json(true);
        } else {
            res.status(200).json(false);
        }
    },

    async getAllCategories(req, res, next) {
        try {
            const user = new User({id: req.user.id});
            const categories = await user.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    },

    isTokenExpired(req, res, next) {
        if(req.isTokenExpired) {
            return res.status(200).json(true);
        }
        res.status(200).json(false);
    }
}

module.exports = userController;