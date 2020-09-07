const jwt = require("jsonwebtoken");
const config = require("config");

module.exports.requireAuth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({
            error: 'No token, Authorization failed'
        });
    }
    try {
        const decodedToken = jwt.verify(token, config.get('jwtSecret'));
        req.user = decodedToken.id
        next();
    } catch (err) {
        console.log(err.message);
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }
}