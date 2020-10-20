const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('Authorization');

    !token && res.status(401).send({
        status: 'failed',
        message: 'Acceso Denegado, Token inexistente'
    });

    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY_APP);
        req.user = payload;
        next();

    } catch (error) {
        return res.status(401).send({
            status: 'failed',
            message: 'Acceso Denegado. Token Inválido'
        });
    };
};

module.exports = auth;