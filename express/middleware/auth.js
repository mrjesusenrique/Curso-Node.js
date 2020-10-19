const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('Authorization');

    !token && res.status(401).send('Acceso Denegado, Token inexistente');

    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY_APP_API);
        req.user = payload;
        next();

    } catch (error) {
        return res.status(401).send('Acceso Denegado. Token Inválido');
    };
};

module.exports = auth;