const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../data/helpers/users-model.js');
const secret = process.env.SECRET || 'a very secret secret';

router.get('/', (req, res) => {
    res.json({ message: 'Authentication route works!' });
});

router.post('/register', async (req, res) => {
    let { username, password } = req.body;
    if (username && password) {
        password = bcrypt.hashSync(password, 10);
        try {
            const user = await db.add({username, password});
            if (user) {
                const token = generateToken(username, user.id);
                res.status(201).json({ message: `Hey ${username}!`, token, userID: user.id })
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    } else {
        res.status(401).json({ message: 'Please provide username and password.' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        try {
            const user = await db.getBy({ username });
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(username, user.id);
                res.status(201).json({ message: `Welcome back ${username}!`, token, userID: user.id });
            } else {
                res.status(401).json({ message: 'Please provide correct username and password.' });
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    } else {
        res.status(401).json({ message: 'You need to enter username and password to login.' });
    }
});

function generateToken(username, id) {
    const payload = {
        username,
        id
    };
    const options = {
        expiresIn: '10d'
    };
    return jwt.sign(payload, secret, options);
}

module.exports = router;