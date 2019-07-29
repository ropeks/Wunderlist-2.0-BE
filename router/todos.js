const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ message: 'Todos route works!' });
});

module.exports = router;