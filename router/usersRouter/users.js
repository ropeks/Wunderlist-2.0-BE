const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../../data/helpers/users-model');

router.get('/test', (req, res) => {
    res.json({ message: 'Users route works!' });
});

router.get('/', async (req, res) => {
    try {
        const users = await db.get();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await db.getById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await db.remove(req.params.id);
        res.status(200).json({ message: 'User has been removed.' });
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.put('/:id', async (req, res) => {
    let { username, password } = req.body;
    if (username && password) {
        password = bcrypt.hashSync(password, 10);
        const changes = { username, password };
        try {
            const id = await db.update(req.params.id, changes);
            const user = await db.getById(id);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err.message);
        }
    } else {
        res.status(401).json({ message: 'You need to insert username and password into request body.' });
    }
});

module.exports = router;