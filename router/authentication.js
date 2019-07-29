const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ message: 'Authentication route works!' });
});

module.exports = router;