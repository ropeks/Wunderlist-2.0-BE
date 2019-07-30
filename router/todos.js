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

router.get('/:id', async (req, res) => {
    try {
        const todo = await db.getById(res.locals.id, req.params.id);
        if (todo) {
            res.status(200).json(todo);
        } else {
            res.status(401).json({ message: 'You are not allowed to see this todo, as it belongs to someone else...' });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const todo = await db.getById(res.locals.id, req.params.id);
        if (todo) {
            await db.remove(res.locals.id, req.params.id);
            res.status(200).json({ message: 'Todo has been deleted.' });
        } else {
            res.status(401).json({ message: 'You are not allowed to delete this todo, as it belongs to someone else...' });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;