function authorize(roles = []) {
    if (typeof roles === 'string') {
        roles = [roles];
    };

    return [
        (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                return res.status(403).send({
                    status: 'failed',
                    message: 'No tiene credenciales para realizar esta acción'
                });
            };
            next();
        }
    ];
};

module.exports = authorize;