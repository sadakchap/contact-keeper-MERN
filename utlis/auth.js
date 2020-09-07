const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

const generateJWTToken = async (id) => {
    const payload = {
        user: {id}
    }
    try {
        const token = await jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3 * 24 * 60 * 60 });
        return token;
    } catch (err) {
        console.log('error while creating JWT token');
        console.log(err);
    }
}

module.exports = {
    hashPassword,
    generateJWTToken
}