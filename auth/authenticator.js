const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'a very secret secret';

function authenticator(req, res, next) {
    const token = req.get('Authorization');
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) return res.status(401).json(err.message);
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(401).json({ message: 'Please provide valid token on the Authorization Header.' });
    }
}

module.exports = authenticator;