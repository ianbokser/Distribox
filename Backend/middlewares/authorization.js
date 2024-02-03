function admin(req, res, next) {
    // console.log(req.headers.cookie)
    // if (!req.user.isAdmin) return res.status(403).send('Access denied.');
    next();
}

function client(req, res, next) {
    if (!req.user) return res.status(403).send('Access denied.');
    next();
}



export const methods = {
    client,
    admin,
}