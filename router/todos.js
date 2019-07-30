const router = require('express').Router();
const db = require('../data/helpers/todos-model');

router.get('/test', (req, res) => {
    res.json({ message: 'Todos route works!' });
});

router.get('/', async (req, res) => {
    try {
        const todos = await db.get(res.locals.id);
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;