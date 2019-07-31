const router = require('express').Router();
const db = require('../../data/helpers/todos-model');

router.get('/test', (req, res) => {
    res.json({ message: 'Todos route works!' });
});

router.post('/', async (req, res) => {
    let { caption, description, due_date } = req.body;
    const { id } = res.locals;
    if (caption && description && due_date) {
        due_date = new Date(...due_date);
        const newTodo = { user_id: id, caption, description, due_date, completed: 0, deleted: 0 };
        try {
            const todo = await db.add(id, newTodo);
            res.status(200).json(todo);
        } catch (err) {
            res.status(500).json(err.message);
        }
    } else {
        res.status(401).json({ message: 'You need to add caption, description and due_date to the request body.' });
    }
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
    switch (req.params.id) {
        case 'deleted':
            try {
                const deleted = await db.getDeleted(res.locals.id);
                res.status(200).json(deleted);
            } catch (err) {
                res.status(500).json(err.message);
            }
            break;
        case 'completed':
            try {
                const completed = await db.getCompleted(res.locals.id);
                res.status(200).json(completed);
            } catch (err) {
                res.status(500).json(err.message);
            }
            break;
        default:
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

router.put('/:id', async (req, res) => {
    let { caption, description, due_date, completed, deleted } = req.body;
    if (caption && description && due_date) {
        due_date = new Date(...due_date);
        const changes = { caption, description, due_date, completed, deleted };
        try {
            const id = await db.update(res.locals.id, req.params.id, changes);
            const todo = await db.getById(res.locals.id, id);
            res.status(200).json(todo);
        } catch (err) {
            res.status(500).json(err.message);
        }
    } else {
        res.status(401).json({ message: 'You need to add caption, description and due_date to the request body.' });
    }
});

module.exports = router;