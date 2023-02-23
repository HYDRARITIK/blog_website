const jwt = require('jsonwebtoken');
const JWT_SECRET = "jwt_key";

const createJWT = (payload) => {
    return jwt.sign(payload, JWT_SECRET);
}


module.exports = createJWT;