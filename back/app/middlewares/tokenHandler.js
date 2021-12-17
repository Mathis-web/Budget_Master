const jwt = require('jsonwebtoken');

const authenticateAccessToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).send('Not connected.');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user ) => {
        if(err) return res.status(403).send('Invallid token');
        req.user = user;
        next();
    });
}

const authenticateRefreshToken = (req, res, next) => {
    const token = req.cookies.refreshToken;
    if(!token) return res.status(401).send('Not connected.');
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user ) => {
        if(err) return res.status(403).send('Invalid token');
        req.user = user;
        req.user.token = token;
        next();
    });
}

const decodeToken = (req, res, next) => {
    if(req.cookies && req.cookies.accessToken) {
        const accessToken = req.cookies.accessToken;
        if(!accessToken) {
            req.isTokenExpired = false;
            next();
        }
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if(err) {
                if(err.message === 'jwt expired'){
                    req.isTokenExpired = true;
                    return next();
                }
                else return res.status(403).send('Invalid token');
            }
            req.isTokenExpired = false;
            req.token = decodedToken;
            next();
        });
    }
}


module.exports = {
    authenticateAccessToken,
    authenticateRefreshToken,
    decodeToken
};