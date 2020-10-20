function admin(req, res, next) {

    let isAdmin = req.user.isAdmin;

    !isAdmin && res.status(403).send({
        status: 'failed',
        message: 'ACCESO DENEGADO: No tienes autorización para realizar esta acción'
    });
    next();
};

module.exports = admin;