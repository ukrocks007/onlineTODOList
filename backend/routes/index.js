const config = require('../configs/config');
const jwt = require('jsonwebtoken');

const routesApi = {};

isLoggedIn = (req, res, next) => {
    console.log(req.xhr);
    if (req.headers.authorization) {
        jwt.verify(req.headers.authorization, config.JWT.secret, (error, decoded) => {
            if (error) {
                return next({
                    message: 'Unauthenticated',
                    status: 401
                });
            }
            req.user = decoded;
            next();
        });
    } else {
        return next({
            message: 'Unauthenticated',
            head: 'Header is not present in the request.',
            status: 401
        });
    }

}

routesApi.includeRoutes = app => {

    app.use('/ping', (req, res) => res.status(200).send('pong'));

    const userAuth = require('./userAuth');
    app.use('/auth', userAuth);

    app.use('/apis/*', isLoggedIn);
}

module.exports = routesApi;