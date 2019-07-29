const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ message: 'Users route works!' });
});

module.exports = router;